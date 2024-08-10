'use client'

import { ErrorPage } from '@/views/error'

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => (
	<ErrorPage error={error} reset={reset} />
)

export default Error
