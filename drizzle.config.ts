import { defineConfig } from 'drizzle-kit'

import { env } from '@/shared/config'

export default defineConfig({
	schema: './shared/api/schemas',
	out: './shared/api/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.POSTGRES_URL
	},
	verbose: true,
	strict: true
})
