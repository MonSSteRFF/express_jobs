import { JobSchema } from "@infra/jobs/jobs.entities";
import { z } from "zod/v4";

export const CreateJobsSchema = {
	request: {
		body: z.object({ urls: z.array(z.string()) }),
	},
	response: z.array(z.object({ id: z.string() })),
};

export const GetJobsListSchema = {
	response: z.object({
		jobs: z.array(JobSchema),
		stats: z.object({
			count: z.number(),
			success: z.number(),
			error: z.number(),
		}),
	}),
};

export const GetJobSchema = {
	request: {
		params: z.object({ id: z.string() }),
	},
	response: JobSchema,
};

export const DeleteJobSchema = {
	request: {
		params: z.object({ id: z.string() }),
	},
	response: z.object({ success: z.boolean() }),
};
