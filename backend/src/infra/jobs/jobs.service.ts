import type { DiContainer } from "@infra/di/di";
import { type IJob, JobStatus } from "@infra/jobs/jobs.types";
import { and, eq, inArray, not } from "drizzle-orm";
import type { NodeSQLiteDatabase } from "drizzle-orm/node-sqlite";
import { jobsTable } from "@/db/schema";

export class JobsService {
	private db: NodeSQLiteDatabase;

	constructor(args: { di: DiContainer }) {
		this.db = args.di.db.sqlite;
	}

	async createJob(job: Pick<IJob, "url">["url"]) {
		const insertedRows = await this.db
			.insert(jobsTable)
			.values({
				id: undefined,
				url: job,
				status: JobStatus.pending,
				createdAt: Date.now(),
			})
			.returning({ id: jobsTable.id });

		return insertedRows.map((row) => row.id);
	}

	async createJobs(jobs: Pick<IJob, "url">["url"][]) {
		const insertedRows = await this.db
			.insert(jobsTable)
			.values(
				jobs.map((job) => ({
					url: job,
					status: JobStatus.pending,
					createdAt: Date.now(),
				})),
			)
			.returning({ id: jobsTable.id });

		return insertedRows.map((row) => row.id);
	}

	async updateJob(id: string, job: Partial<Pick<IJob, "status" | "startedAt" | "finishedAt" | "httpStatus" | "error">>) {
		const rows = await this.db.update(jobsTable).set(job).where(eq(jobsTable.id, id)).returning();
		return rows.length > 0 ? rows[0] : null;
	}

	getJob(id: string) {
		return this.db.select().from(jobsTable).where(eq(jobsTable.id, id)).get();
	}

	async getAll(args: { statuses?: JobStatus[]; ignoredStatuses?: JobStatus[]; limit?: number }) {
		const query = this.db
			.select()
			.from(jobsTable)
			.where(and(args.statuses ? inArray(jobsTable.status, args.statuses) : undefined, args.ignoredStatuses ? not(inArray(jobsTable.status, args.ignoredStatuses)) : undefined));

		if (args.limit) {
			query.limit(args.limit);
		}

		return await query;
	}
}
