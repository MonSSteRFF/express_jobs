import type { DiContainer } from "@infra/di/di";
import { type IJob, JobStatus } from "@infra/jobs/jobs.types";
import { httpResolver } from "@inter/queue/httpResolver";
import { QueueManager } from "@inter/queue/QueueManager";
import { env } from "@utils/env";
import { logger } from "@utils/logger";

export const createQueue = async (container: DiContainer) => {
	logger("create queue");

	const runner = async (job: IJob) => {
		await container.jobs.updateJob(job.id, { startedAt: Date.now(), status: JobStatus.in_progress });
		await container.jobs.updateJob(job.id, { finishedAt: Date.now(), ...(await httpResolver(job.url)) });
	};

	const getter = async (): Promise<IJob[]> => {
		const jobs = await container.jobs.getAll({ statuses: [JobStatus.pending], limit: env.MAX_QUEUE });
		logger("try get jobs:", jobs.length > 0 ? `found ${jobs.length} jobs - lets process` : "jobs not found ");
		return jobs;
	};

	const queue = new QueueManager<IJob>({ maxConcurrency: env.MAX_QUEUE, runner, getter });
	queue.start(env.QUEUE_INTERVAL);
};
