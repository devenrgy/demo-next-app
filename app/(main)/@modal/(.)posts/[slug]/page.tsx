import { PostPage } from '@/views/post'
import { Modal } from '@/widgets/modal'

interface Props {
	params: {
		slug: string
	}
}

const Page = ({ params: { slug } }: Props) => (
	<Modal>
		<PostPage slug={slug} />
	</Modal>
)

export default Page
