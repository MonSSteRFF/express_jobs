import { randomUUID } from "node:crypto";
import { JobStatus } from "@infra/jobs/jobs.types";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const jobsTable = sqliteTable("jobs_table", {
	id: text()
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	url: text().notNull(),
	status: text({ enum: [JobStatus.pending, JobStatus.in_progress, JobStatus.completed, JobStatus.cancelled, JobStatus.failed] }).notNull(),
	httpStatus: text(),
	error: text(),
	createdAt: int().notNull(),
	startedAt: int(),
	finishedAt: int(),
});
