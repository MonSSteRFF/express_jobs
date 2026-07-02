import { z } from "zod/v4";
import { JobStatus } from "@/infra/jobs/jobs.types";

export const JobSchema = z
	.discriminatedUnion("status", [
		z.object({
			status: z.literal(JobStatus.pending),
		}),
		z.object({
			status: z.literal(JobStatus.in_progress),
			startedAt: z.number(),
		}),
		z.object({
			status: z.literal(JobStatus.completed),
			httpStatus: z.string(),
			startedAt: z.number(),
			finishedAt: z.number(),
		}),
		z.object({
			status: z.literal(JobStatus.cancelled),
		}),
		z.object({
			status: z.literal(JobStatus.failed),
			httpStatus: z.string(),
			error: z.string().optional(),
			startedAt: z.number(),
			finishedAt: z.number(),
		}),
	])
	.and(
		z.object({
			id: z.string(),
			createdAt: z.number(),
			url: z.string(),
		}),
	);
