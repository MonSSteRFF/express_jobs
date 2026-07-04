if (!process.env.DB_FILE_NAME) throw new Error("DB_FILE_NAME is required in .env");

export const env = {
	DB_NAME: process.env.DB_FILE_NAME,
	PORT: process.env.PORT ? Number(process.env.PORT) : 8080,
	HOST: process.env.HOST ? process.env.HOST : "localhost",
	MAX_QUEUE: process.env.MAX_QUEUE ? Number(process.env.MAX_QUEUE) : 5,
	QUEUE_INTERVAL: process.env.QUEUE_INTERVAL ? Number(process.env.QUEUE_INTERVAL) : 5000,
	QUEUE_MAX_DELAY: process.env.QUEUE_MAX_DELAY ? Number(process.env.QUEUE_MAX_DELAY) : 10000,
};
