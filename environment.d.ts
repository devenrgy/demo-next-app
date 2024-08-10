import * as v from 'valibot'

const envSchema = v.object({
	API_TOKEN: v.string(),
})

declare global {
	namespace NodeJS {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface ProcessEnv extends v.InferOutput<typeof envSchema> {}
	}
}
