import type { DB } from '@/db'
import type { CategorySchema} from '@/db/schemas';
import {categoryTable } from '@/db/schemas'

const mock: CategorySchema[] = [
	{
		name: 'Technology'
	},
	{
		name: 'Health'
	},
	{
		name: 'Finance'
	},
	{
		name: 'Education'
	},
	{
		name: 'Travel'
	},
	{
		name: 'Entertainment'
	}
]

export const categories = async (db: DB) => await db.insert(categoryTable).values(mock)
