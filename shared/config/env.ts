import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import * as v from 'valibot'

const envSchema = v.object({
	POSTGRES_URL: v.string()
})

expand(config())

try {
	v.parse(envSchema, process.env)
} catch (error) {
	if (error instanceof v.ValiError) {
		console.error('Environment validation error:', error.message)
	}
	console.error(error)
}

export const env = v.parse(envSchema, process.env)
