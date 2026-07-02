import { DatabaseSync } from "node:sqlite";
import { drizzle, type NodeSQLiteDatabase } from "drizzle-orm/node-sqlite";

const DB_NAME = process.env.DB_FILE_NAME;

export class Db {
	public sqlite: NodeSQLiteDatabase;

	constructor() {
		if (!DB_NAME) throw new Error("Missing DB_NAME");

		const sqlite = new DatabaseSync(DB_NAME);
		this.sqlite = drizzle({ client: sqlite });
	}
}
