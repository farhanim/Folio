import { api } from '#lib/api/client.ts';
import type { ApiResponse } from '#lib/types/index.ts';

export const healthService = {
	check: () => api.get<ApiResponse<{ status: string }>>('/health')
};
