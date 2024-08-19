import { defineConfig } from 'drizzle-kit'

import { env } from './shared/config'

export default defineConfig({
	schema: './shared/db/schemas',
	out: './shared/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.POSTGRES_URL
	},
	verbose: true,
	strict: true
})
