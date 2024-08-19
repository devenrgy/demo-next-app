import { createPool } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

import { env } from '@/shared/config'

import * as schema from './schemas'

const client = createPool({
	connectionString: env.POSTGRES_URL
})

export const db = drizzle(client, { schema })
export type DB = typeof db
