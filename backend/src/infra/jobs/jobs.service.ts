import type { DiContainer } from "@infra/di/di";
import { type IJob, JobStatus } from "@infra/jobs/jobs.types";
import { eq, not } from "drizzle-orm";
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

	async updateJob(
		id: string,
		job: Pick<
			IJob,
			"status" | "startedAt" | "finishedAt" | "httpStatus" | "error"
		>,
	) {
		const rows = await this.db
			.update(jobsTable)
			.set(job)
			.where(eq(jobsTable.id, id))
			.returning();

		const updatedJob = rows[0];

		if (!updatedJob) {
			throw new Error(`Job with id ${id} not found`);
		}

		return updatedJob;
	}

	getJob(id: string) {
		return this.db.select().from(jobsTable).where(eq(jobsTable.id, id)).get();
	}

	async getAllNonDeletedJobs() {
		return this.db
			.select()
			.from(jobsTable)
			.where(not(eq(jobsTable.status, JobStatus.deleted)));
	}
}
