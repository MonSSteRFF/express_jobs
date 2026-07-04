import { jobsApi } from "@api/jobs/JobsApi";
import { useJobs } from "@store/useJobs";
import type React from "react";
import { useEffect } from "react";
import styles from "./JobsList.module.css";

export const JobsList: React.FC = () => {
	const { addJobs, jobs, removeJob } = useJobs();

	const refetch = () => {
		jobsApi.list().then((data) => {
			addJobs(data);
		});
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: infinite rerender while refetch inside useEffect deps
	useEffect(() => {
		refetch();

		setInterval(() => {
			refetch();
		}, 300);
	}, [addJobs]);

	const intl = Intl.DateTimeFormat("ru", { dateStyle: "short", timeStyle: "long", hourCycle: "h24" });

	const handleDelete = (id: string) => {
		jobsApi.delete(id).then((data) => {
			if (data.success) {
				removeJob(id);
			}
		});
	};

	return (
		<div className={styles.content}>
			<button type={"button"} onClick={refetch}>
				update
			</button>
			<div className={styles.list}>
				{jobs.map((job) => {
					return (
						<div className={styles.list_item} key={job.id}>
							<h4>id: {job.id}</h4>
							<p>
								url: <a href={job.url}>{job.url}</a>
							</p>
							<p>createdAt: {intl.format(new Date(job.createdAt))}</p>
							<p>status: {job.status}</p>
							{job.httpStatus && <p>httpStatus: {job.httpStatus}</p>}
							{job.error && <p>error: {job.error}</p>}
							{job.startedAt && <p>startedAt: {intl.format(job.startedAt)}</p>}
							{job.finishedAt && <p>finishedAt: {intl.format(job.finishedAt)}</p>}

							<button type={"button"} onClick={() => handleDelete(job.id)}>
								delete
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};
