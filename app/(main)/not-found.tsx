import type { Metadata } from 'next'

import { NotFoundPage } from '@/views/not-found'

export const metadata: Metadata = {
	title: 'Not Found'
}

const NotFound = () => <NotFoundPage />

export default NotFound
