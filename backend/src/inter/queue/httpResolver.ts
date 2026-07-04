import { JobStatus } from "@infra/jobs/jobs.types";
import { env } from "@utils/env";
import { sleep } from "@utils/sleep";

type httpResolverResult =
	| {
			status: JobStatus.completed;
			httpStatus: string;
	  }
	| {
			status: JobStatus.failed;
			httpStatus: string;
			error: string;
	  };

export const httpResolver = async (url: string): Promise<httpResolverResult> => {
	try {
		const response = await fetch(new URL(url), { method: "HEAD" });

		await sleep(Math.floor(Math.random() * env.QUEUE_MAX_DELAY));

		if (response.ok) {
			return {
				status: JobStatus.completed,
				httpStatus: String(response.status),
			};
		}

		return {
			status: JobStatus.failed,
			httpStatus: String(response.status),
			error: String(response.statusText),
		};
	} catch (error) {
		await sleep(Math.floor(Math.random() * env.QUEUE_MAX_DELAY));

		return {
			status: JobStatus.failed,
			httpStatus: "0",
			error: error ? String(error) : "Network error",
		};
	}
};
