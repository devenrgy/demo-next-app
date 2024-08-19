import type { DB } from '../db'
import { categoryTable } from '../schemas'

import mock from './data/categories.json'

export const categories = async (db: DB) => await db.insert(categoryTable).values(mock)
