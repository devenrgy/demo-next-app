import { API_BASE_URL, API_OPTIONS } from '../config/api'

class ApiClient {
	private baseUrl: string
	private options: RequestInit

	constructor(url: string, options: RequestInit) {
		this.baseUrl = url
		this.options = options
	}

	async handleResponse<TResult>(response: Response): Promise<TResult> {
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status.toString()}`)
		}

		try {
			return (await response.json()) as TResult
		} catch (error) {
			throw new Error('Error parsing JSON response', { cause: error })
		}
	}

	public async get<TResult = unknown>(
		endpoint: string,
		queryParams?: Record<string, string | number>
	): Promise<TResult> {
		const url = new URL(endpoint, this.baseUrl)

		if (queryParams) {
			Object.entries(queryParams).forEach(([key, value]) => {
				url.searchParams.append(key, value.toString())
			})
		}

		const response = await fetch(url.toString(), {
			...this.options,
			method: 'GET'
		})

		return this.handleResponse<TResult>(response)
	}

	public async post<TResult = unknown>(endpoint: string, body: Record<string, unknown>): Promise<TResult> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			...this.options,
			method: 'POST',
			body: JSON.stringify(body)
		})

		return this.handleResponse<TResult>(response)
	}
}

export const apiClient = new ApiClient(API_BASE_URL, API_OPTIONS)
