if (!process.env.DB_FILE_NAME) throw new Error("DB_FILE_NAME is required in .env");

export const env = {
	DB_NAME: process.env.DB_FILE_NAME,
	PORT: process.env.PORT || 8080,
};
