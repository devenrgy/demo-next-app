import { asc, between, sql } from 'drizzle-orm'
import { cache } from 'react'

import { db } from '../db'
import { posts } from '../schema'

export const getPostsForLast24Hours = cache(
	async (
		page = 1,
		pageSize = 5
	): Promise<
		{
			id: number
			title: string
		}[]
	> =>
		db
			.select({
				id: posts.id,
				title: posts.title
			})
			.from(posts)
			.where(between(posts.createdAt, sql`now() - interval '1 day'`, sql`now()`))
			.orderBy(asc(posts.title), asc(posts.id))
			.limit(pageSize)
			.offset((page - 1) * pageSize)
)
