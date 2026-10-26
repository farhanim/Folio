import { PUBLIC_API_URL } from '$app/env/public';
import { ApiError } from '#lib/types/index.ts';

type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown };

const baseUrl = () => PUBLIC_API_URL;

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
	const { body, headers, ...rest } = options;

	const res = await fetch(`${baseUrl()}${path}`, {
		...rest,
		headers: { 'Content-Type': 'application/json', ...headers },
		body: body === undefined ? undefined : JSON.stringify(body)
	});

	if (!res.ok) {
		throw new ApiError(res.status, res.statusText || 'Request failed');
	}

	return (await res.json()) as T;
}

export const api = {
	get: <T>(path: string, options?: RequestOptions) =>
		request<T>(path, { ...options, method: 'GET' }),
	post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>(path, { ...options, method: 'POST', body }),
	put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>(path, { ...options, method: 'PUT', body }),
	delete: <T>(path: string, options?: RequestOptions) =>
		request<T>(path, { ...options, method: 'DELETE' })
};
