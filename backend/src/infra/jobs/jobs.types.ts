export enum JobStatus {
	pending = "pending",
	in_progress = "in_progress",
	completed = "completed",
	cancelled = "cancelled",
	failed = "failed",

	deleted = "deleted",
}

export interface IJob {
	id: string;
	url: string;
	status: JobStatus;
	createdAt: number;
	startedAt?: number;
	finishedAt?: number;
	httpStatus?: string;
	error?: string;
}
