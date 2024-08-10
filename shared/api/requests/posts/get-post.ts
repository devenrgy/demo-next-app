import type { Post } from '@/shared/model/posts'

import { apiClient } from '../../base'

const ENDPOINT = '/posts'

export const getPost = async (id: string): Promise<Post> => apiClient.get(ENDPOINT + '/' + id)
