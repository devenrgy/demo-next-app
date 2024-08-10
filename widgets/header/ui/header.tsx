import { Avatar, AvatarFallback, AvatarImage, ModeToggle } from '@/shared/ui'

import { Cart } from './cart'
import { Logo } from './logo'
import { NavLinks } from './nav-links'

export const Header = () => (
	<header className='border-b @container'>
		<div className='container flex flex-col items-center ~gap-6/10 ~py-5/10 @2xl:flex-row'>
			<Logo />

			<NavLinks className='@2xl:ml-auto' />

			<div className='flex items-center ~gap-5/10'>
				<ModeToggle />
				<Avatar>
					<AvatarImage src='https://github.com/shadcn.png' />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Cart />
			</div>
		</div>
	</header>
)
