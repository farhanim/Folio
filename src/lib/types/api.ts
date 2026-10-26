export interface ApiResponse<T> {
	success: boolean;
	message?: string;
	data: T;
}

export class ApiError extends Error {
	constructor(
		public status: number,
		message: string
	) {
		super(message);
		this.name = 'ApiError';
	}
}
