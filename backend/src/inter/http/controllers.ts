import type { DiContainer } from "@infra/di/di";
import type { Express } from "express";
import { jobsController } from "./jobs/jobsController";

export const initControllers = (app: Express, container: DiContainer) => {
	app.use("/jobs", jobsController(container));
};
