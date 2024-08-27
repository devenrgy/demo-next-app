'use server'

import { eq } from 'drizzle-orm'
import { cache } from 'react'

import { db, type InferResultType } from '@/db'
import { postTable } from '@/db/schemas'

export const getPost = cache(
	async (slug: string) =>
		await db.query.postTable.findFirst({
			where: eq(postTable.title, slug.replace(/%20/g, ' ')),
			with: {
				tags: {
					columns: {},
					with: {
						tag: {
							columns: {
								name: true
							}
						}
					}
				}
			}
		})
)

export type SelectPostWithTags = InferResultType<
	'postTable',
	{
		tags: { with: { tag: { columns: { name: true } } }; columns: {} }
	}
>
