import { jobsApi } from "@api/jobs/JobsApi";
import type { IJob } from "@store/jobs.types";
import { useJobs } from "@store/useJobs";
import type React from "react";
import { useState } from "react";
import styles from "./CreateJob.module.css";

interface IProps {
	close: () => void;
	isOpen: boolean;
}

export const CreateJob: React.FC<IProps> = ({ close, isOpen }) => {
	const [value, setValue] = useState("");

	const { addJobs } = useJobs();

	const onCreateJobs = (urls: string[]) => {
		jobsApi.create(urls).then(async (res) => {
			const responses = await Promise.allSettled(
				res.map((id) => {
					return jobsApi.get(id);
				}),
			);

			const jobs = new Map<string, IJob>();

			responses.forEach((res) => {
				if (res.status === "fulfilled" && res.value) {
					jobs.set(res.value.id, res.value);
				}
			});

			addJobs([...jobs.values()]);
		});
	};

	const onSubmit = () => {
		onCreateJobs(value.split("\n"));
		setValue("");
		close();
	};

	if (!isOpen) return null;

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<div>
				<h2>Create new jobs</h2>
				<button type={"button"} className={styles.close} onClick={close}>
					close
				</button>
			</div>
			<textarea value={value} onChange={(e) => setValue(e.target.value)} />
			<button type={"submit"}>Create</button>
		</form>
	);
};
