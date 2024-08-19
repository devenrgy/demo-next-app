import { eq } from 'drizzle-orm'

import { db } from '../db'
import type { SelectPost } from '../schema'
import { posts } from '../schema'

export const updatePost = async (id: SelectPost['id'], data: Partial<Omit<SelectPost, 'id'>>) =>
	await db.update(posts).set(data).where(eq(posts.id, id))
