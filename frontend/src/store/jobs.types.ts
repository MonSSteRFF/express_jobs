export enum JobStatus {
	pending = "pending",
	in_progress = "in_progress",
	completed = "completed",
	cancelled = "cancelled",
	failed = "failed",
}

export interface IJob {
	id: string;
	url: string;
	createdAt: number;
	status: JobStatus;
	httpStatus: string | null;
	error: string | null;
	startedAt: number | null;
	finishedAt: number | null;
}
