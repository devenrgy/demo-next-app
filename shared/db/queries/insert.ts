import { db } from '../db'
import type { InsertPost } from '../schema'
import { posts } from '../schema'

export const createPost = async (data: InsertPost) => await db.insert(posts).values(data)
