import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const middleware = (request: NextRequest) => {
	return NextResponse.next()
}

export const config = {
	matcher: '/posts/:path+'
}
