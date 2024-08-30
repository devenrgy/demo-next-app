'use server'

import { sql } from 'drizzle-orm'
import { cache } from 'react'

import { db, type InferResultType } from '@/db'
import { postTable } from '@/db/schemas'

export const getAllPosts = cache(async (page = 1, pageSize = 5) => {
	const { totalPages } = (
		await db.select({ totalPages: sql`COUNT(*) / ${pageSize} AS total_pages` }).from(postTable)
	)[0] as { totalPages: number }

	const posts = await db.query.postTable.findMany({
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
		},
		limit: pageSize,
		offset: (page - 1) * pageSize
	})

	return {
		posts,
		totalPages
	}
})

export type SelectAllPostsWithTags = InferResultType<
	'postTable',
	{
		tags: { with: { tag: { columns: { name: true } } }; columns: {} }
	}
>[]
