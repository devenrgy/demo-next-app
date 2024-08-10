import type { Posts } from '@/shared/model'

import { apiClient } from '../../base'

const ENDPOINT = '/posts'

export const getPosts = async ({ limit, skip = 0 }: { limit: number; skip?: number }): Promise<Posts> =>
	apiClient.get(ENDPOINT, { limit, skip })
