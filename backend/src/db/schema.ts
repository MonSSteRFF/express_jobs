import { randomUUID } from "node:crypto";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const jobsTable = sqliteTable("jobs_table", {
	id: text()
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	url: text().notNull(),
	status: text().notNull(),
	httpStatus: text(),
	error: text(),
	startedAt: int(),
	finishedAt: int(),
});
