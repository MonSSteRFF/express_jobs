import type { DiContainer } from "@infra/di/di";
import { JobsModule } from "@infra/jobs/jobs.module";
import { CreateJobsSchema, DeleteJobSchema, GetJobSchema, GetJobsListSchema } from "@inter/http/jobs/jobsController.schema";
import { validateRoute } from "@inter/http/middleware/validateRoute";
import { Router } from "express";

const router = Router();

export const jobsController = (container: DiContainer) => {
	const modules = {
		jobs: new JobsModule({ di: container }),
	};

	router.post("/", validateRoute(CreateJobsSchema), async (req, res) => {
		res.send(await modules.jobs.create(req.body.urls));
	});

	router.get("/", validateRoute(GetJobsListSchema), async (_req, res) => {
		res.send(await modules.jobs.getAll());
	});

	router.get("/:id", validateRoute(GetJobSchema), (req, res) => {
		res.send(modules.jobs.getOne(req.params.id));
	});

	router.delete("/:id", validateRoute(DeleteJobSchema), async (req, res) => {
		res.send({ success: await modules.jobs.delete(req.params.id) });
	});

	return router;
};
