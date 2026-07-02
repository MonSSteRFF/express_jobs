import type { DiContainer } from "@infra/di/di";
import type { JobsService } from "@infra/jobs/jobs.service";
import { type IJob, JobStatus } from "@infra/jobs/jobs.types";

export class JobsModule {
	private jobsService: JobsService;

	constructor(args: { di: DiContainer }) {
		this.jobsService = args.di.jobs;
	}

	async create(urls: Pick<IJob, "url">["url"][]) {
		const createdIds = await this.jobsService.createJobs(urls);
		return createdIds.map((id) => ({ jobid: id }));
	}

	async getAll() {
		return await this.jobsService.getAllNonDeletedJobs();
	}

	getOne(id: string) {
		return this.jobsService.getJob(id);
	}

	async delete(id: string) {
		try {
			await this.jobsService.updateJob(id, { status: JobStatus.deleted });
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}
