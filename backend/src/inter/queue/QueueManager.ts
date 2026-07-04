interface QueueConfig<T> {
	maxConcurrency: number;
	getter: () => Promise<Array<T>>;
	runner: (arg: T) => Promise<void>;
}

export class QueueManager<T> {
	private maxConcurrency: number;
	private currentWorkers: number;
	private isRunning: boolean;

	private getter: () => Promise<Array<T>>;
	private runner: (arg: T) => Promise<void>;

	constructor(cfg: QueueConfig<T>) {
		this.maxConcurrency = cfg.maxConcurrency;
		this.currentWorkers = 0;
		this.isRunning = false;

		this.getter = cfg.getter;
		this.runner = cfg.runner;
	}

	private async checkAndRun() {
		if (this.currentWorkers !== 0 || this.currentWorkers >= this.maxConcurrency || this.isRunning) return;

		this.isRunning = true;

		try {
			const records = await this.getter();

			if (records.length === 0) {
				this.isRunning = false;
				return;
			}

			for (const record of records) {
				this.currentWorkers++;
				this.runner(record).then(() => {
					this.currentWorkers--;
					if (this.currentWorkers === 0) {
						this.isRunning = false;
					}
					this.checkAndRun();
				});
			}
		} catch (e) {
			console.error(e);
		}
	}

	start(checkerInterval = 5000) {
		this.checkAndRun();

		setInterval(() => {
			this.checkAndRun();
		}, checkerInterval);
	}
}
