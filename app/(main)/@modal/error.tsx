'use client'

import { ErrorPage } from '@/views/error'
import { Modal } from '@/widgets/modal'

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => (
	<Modal visibleBackButton={false}>
		<div className='h-[200px] w-[620px]'>
			<ErrorPage error={error} reset={reset} />
		</div>
	</Modal>
)

export default Error
