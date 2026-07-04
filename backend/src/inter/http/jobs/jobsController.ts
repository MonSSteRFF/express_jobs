import type { DiContainer } from "@infra/di/di";
import { JobsModule } from "@infra/jobs/jobs.module";
import { JobStatus } from "@infra/jobs/jobs.types";
import { CreateJobsSchema, DeleteJobSchema, GetJobSchema, GetJobsListSchema } from "@inter/http/jobs/jobsController.schema";
import { validateRoute } from "@inter/http/middleware/validateRoute";
import { Router } from "express";

export const jobsController = (container: DiContainer) => {
	const modules = {
		jobs: new JobsModule({ di: container }),
	};
	const router = Router();

	router.post("/", async (req, res) => {
		const body = await CreateJobsSchema.request.body.parseAsync(req.body);
		const rawResponse = await modules.jobs.create(body.urls);
		const response = await CreateJobsSchema.response.parseAsync(rawResponse);
		res.send(response);
	});

	router.get("/", async (_req, res) => {
		const rawJobList = await modules.jobs.getAll();
		const response = await GetJobsListSchema.response.parseAsync({
			jobs: rawJobList,
			stats: {
				count: rawJobList.length,
				success: rawJobList.filter((job) => job.status === JobStatus.completed).length,
				error: rawJobList.filter((job) => job.status === JobStatus.failed).length,
			},
		});
		res.send(response);
	});

	router.get("/:id", async (req, res) => {
		const { id } = await GetJobSchema.request.params.parseAsync(req.params);

		const rawJob = await modules.jobs.getOne(id);

		const response = await GetJobSchema.response.parseAsync(rawJob);

		res.send(response);
	});

	router.delete("/:id", validateRoute(DeleteJobSchema), async (req, res) => {
		const { id } = await DeleteJobSchema.request.params.parseAsync(req.params);

		const rawDelete = await modules.jobs.delete(id);

		const response = DeleteJobSchema.response.parseAsync(rawDelete);

		res.send(response);
	});

	return router;
};
