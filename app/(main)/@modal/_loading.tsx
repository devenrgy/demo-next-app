import { Skeleton } from '@/shared/ui'
import { Modal } from '@/widgets/modal'

const Loading = () => (
	<Modal>
		<div>
			<Skeleton className='mb-5 h-12 w-[420px] rounded' />

			<Skeleton className='mb-12 h-[100px] w-[620px] rounded' />

			<ul className='flex h-10 gap-5'>
				<Skeleton className='w-20 rounded' />
				<Skeleton className='w-20 rounded' />
			</ul>
		</div>
	</Modal>
)

export default Loading
