import { ShoppingBasket } from 'lucide-react'

import { Button, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui'

export const Cart = ({ className }: { className?: string }) => (
	<div className={className}>
		<Sheet>
			<SheetTrigger asChild>
				<Button size='icon'>
					<ShoppingBasket />
				</Button>
			</SheetTrigger>
			<SheetContent className='w-full'>
				<SheetHeader>
					<SheetTitle>Cart</SheetTitle>
					<SheetDescription>Empty</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	</div>
)
