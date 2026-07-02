import { initControllers } from "@inter/http/controllers";
import { env } from "@utils/env";
import express from "express";
import { createDi } from "@/infra/di/di";

export const createHttpInterface = async () => {
	const app = express();
	app.use(express.json());

	const container = await createDi();

	app.use("/api", () => initControllers(app, container));

	app.listen(env.PORT, () => {
		console.log(`Server started on port ${env.PORT}`);
	});

	return app;
};
