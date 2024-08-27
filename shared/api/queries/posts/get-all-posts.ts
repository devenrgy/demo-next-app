'use server'

import { cache } from 'react'

import { db, type InferResultType } from '@/db'

export const getAllPosts = cache(async (page = 1, pageSize = 5) =>
	db.query.postTable.findMany({
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
)

export type SelectAllPostsWithTags = InferResultType<
	'postTable',
	{
		tags: { with: { tag: { columns: { name: true } } }; columns: {} }
	}
>[]
