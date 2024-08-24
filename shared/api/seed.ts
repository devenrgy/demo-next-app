import { sql, type Table } from 'drizzle-orm'

import type { DB } from '@/db'
import { db } from '@/db'
import * as schema from '@/db/schemas'
import * as seeds from '@/db/seeds'

const resetTable = async (db: DB, table: Table) => db.execute(sql`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`)

const main = async () => {
	for (const table of [
		schema.categoryTable,
		schema.userTable,
		schema.tagTable,
		schema.postTable,
		schema.postTagsTable,
		schema.commentTable
	]) {
		await resetTable(db, table)
	}
	await seeds.categories(db)
	await seeds.users(db)
	await seeds.tags(db)
	await seeds.posts(db)
	await seeds.postTags(db)
	await seeds.comments(db)
}

main()
	.catch((error: unknown) => {
		console.error(error)
		process.exit(1)
	})
	.finally(() => {
		console.log('Seeding done!')
		process.exit(0)
	})
