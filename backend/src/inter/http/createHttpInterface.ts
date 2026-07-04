import { initControllers } from "@inter/http/controllers";
import { env } from "@utils/env";
import { logger } from "@utils/logger";
import express from "express";
import type { DiContainer } from "@/infra/di/di";

export const createHttpInterface = async (container: DiContainer) => {
	const app = express();

	app.use(express.json());

	const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
	app.use((req, res, next) => {
		const origin = req.headers.origin;
		if (origin && allowedOrigins.includes(origin)) {
			res.setHeader("Access-Control-Allow-Origin", origin);
		}
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type");
		next();
	});

	initControllers(app, container);

	app.listen(env.PORT, env.HOST, () => {
		logger(`Server started on port http://${env.HOST}:${env.PORT}`);
	});

	return app;
};
