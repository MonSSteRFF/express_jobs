import type { DiContainer } from "@infra/di/di";
import type { JobsService } from "@infra/jobs/jobs.service";
import { type IJob, JobStatus } from "@infra/jobs/jobs.types";

export class JobsModule {
	private jobsService: JobsService;

	constructor(args: { di: DiContainer }) {
		this.jobsService = args.di.jobs;
	}

	async create(urls: Pick<IJob, "url">["url"][]) {
		return await this.jobsService.createJobs(urls);
	}

	async getAll() {
		return await this.jobsService.getAll({ ignoredStatuses: [JobStatus.cancelled] });
	}

	getOne(id: string) {
		return this.jobsService.getJob(id);
	}

	async delete(id: string) {
		try {
			const updated = await this.jobsService.updateJob(id, { status: JobStatus.cancelled });
			return { success: !!updated };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}
}
