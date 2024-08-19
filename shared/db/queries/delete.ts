import { eq } from 'drizzle-orm'

import { db } from '../db'
import type { SelectPost } from '../schema'
import { posts } from '../schema'

export const deletePost = async (id: SelectPost['id']) => await db.delete(posts).where(eq(posts.id, id))
