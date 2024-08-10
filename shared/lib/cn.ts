import { withFluid } from '@fluid-tailwind/tailwind-merge'
import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge(withFluid)

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
