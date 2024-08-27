'use server'

import { between, sql } from 'drizzle-orm'
import { cache } from 'react'

import { db } from '@/db'
import { postTable } from '@/db/schemas'

export const getPostsForLast24Hours = cache(async (page = 1, pageSize = 5) =>
	db.query.postTable.findMany({
		where: between(postTable, sql`now() - interval '1 day'`, sql`now()`),
		limit: pageSize,
		offset: (page - 1) * pageSize
	})
)
