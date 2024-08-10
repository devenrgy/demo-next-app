export const API_BASE_URL = 'https://dummyjson.com'

export const API_OPTIONS = {
	headers: {
		accept: 'application/json',
		'content-type': 'application/json',
		Authorization: process.env.API_TOKEN
	}
} as const
