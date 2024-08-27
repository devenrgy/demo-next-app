import { createPool } from '@vercel/postgres'
import type { BuildQueryResult, DBQueryConfig, ExtractTablesWithRelations } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/vercel-postgres'

import * as schema from '@/db/schemas'
import { env } from '@/shared/config'

const client = createPool({
	connectionString: env.POSTGRES_URL
})

export const db = drizzle(client, { schema })
export type DB = typeof db

type Schema = typeof schema
type TSchema = ExtractTablesWithRelations<Schema>

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
	'one' | 'many',
	boolean,
	TSchema,
	TSchema[TableName]
>['with']

export type InferResultType<
	TableName extends keyof TSchema,
	With extends IncludeRelation<TableName> | undefined = undefined
> = BuildQueryResult<
	TSchema,
	TSchema[TableName],
	{
		with: With
	}
>
