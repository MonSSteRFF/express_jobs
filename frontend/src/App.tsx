import { CreateJob } from "@components/CreateJob";
import { JobsList } from "@components/JobsList";
import { useState } from "react";
import styles from "./App.module.css";

export const App = () => {
	const [isCreateOpen, setIsCreateOpen] = useState(false);

	return (
		<div className={styles.layout}>
			<header>
				<button type={"button"} onClick={() => setIsCreateOpen(true)}>
					create job
				</button>
			</header>

			<CreateJob
				close={() => {
					setIsCreateOpen(false);
				}}
				isOpen={isCreateOpen}
			/>

			<JobsList />
		</div>
	);
};
