/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['image.tmdb.org']
	},
	env: {
		API_TOKEN: process.env.API_TOKEN
	}
}

export default nextConfig
