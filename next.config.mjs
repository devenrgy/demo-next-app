/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		taint: true
	},
	images: {
		domains: ['image.tmdb.org']
	},
	env: {
		API_TOKEN: process.env.API_TOKEN
	}
}

export default nextConfig
