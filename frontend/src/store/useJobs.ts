import type { IJob } from "@store/jobs.types";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand/react";

interface JobsStoreValues {
	jobs: IJob[];
	stats: { count: number; success: number; error: number };
}
interface IJobsStoreActions {
	addJobs: (data: { jobs: IJob[]; stats: JobsStoreValues["stats"] }) => void;
}

type JobsStore = JobsStoreValues & IJobsStoreActions;

export const useJobs = create<JobsStore>()(
	immer((set) => ({
		jobs: [],
		stats: {
			count: 0,
			error: 0,
			success: 0,
		},
		addJobs: (data) =>
			set((state) => {
				state.jobs = data.jobs.sort((a, b) => b.createdAt - a.createdAt);
				state.stats = data.stats;
			}),
	})),
);
