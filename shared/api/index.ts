import { createPool } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

import * as schema from '@/db/schemas'
import { env } from '@/shared/config'

const client = createPool({
	connectionString: env.POSTGRES_URL
})

export const db = drizzle(client, { schema })
export type DB = typeof db
