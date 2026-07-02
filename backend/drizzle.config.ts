import { env } from "@utils/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./src/db",
	schema: "./src/db/schema.ts",
	dialect: "sqlite",
	dbCredentials: {
		url: env.DB_NAME,
	},
});
