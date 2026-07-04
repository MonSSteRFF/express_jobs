import { $api } from "@api/api";
import type { IJob } from "@store/jobs.types";

export const jobsApi = {
	create: async (urls: string[]): Promise<string[]> => {
		try {
			const response = await $api.post("/jobs", { urls });
			return (await response.json()) as string[];
		} catch (e) {
			console.error(e);
			return [];
		}
	},
	list: async (): Promise<{ jobs: IJob[]; stats: { count: number; error: number; success: number } }> => {
		try {
			const response = await $api.get("/jobs");
			return (await response.json()) as { jobs: IJob[]; stats: { count: number; error: number; success: number } };
		} catch (e) {
			console.error(e);
			return { jobs: [], stats: { count: 0, error: 0, success: 0 } };
		}
	},
	get: async (id: string): Promise<IJob | null> => {
		try {
			const response = await $api.get(`/jobs/${id}`);
			return (await response.json()) as IJob;
		} catch (e) {
			console.error(e);
			return null;
		}
	},
	delete: async (id: string): Promise<{ success: boolean }> => {
		try {
			const response = await $api.delete(`/jobs/${id}`);
			return (await response.json()) as { success: boolean };
		} catch (e) {
			console.error(e);
			return { success: false };
		}
	},
};
