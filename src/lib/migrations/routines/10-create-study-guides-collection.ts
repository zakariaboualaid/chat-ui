import { ObjectId } from "mongodb";
import type { Migration } from ".";
import type { Database } from "$lib/server/database";
import { env } from "$env/dynamic/private";

const migration: Migration = {
	_id: new ObjectId("65ccf1234567890123456789"),
	name: "Create Study Guides Collection",

	async up(client: Database): Promise<boolean> {
		try {
			const db = client.getClient().db(env.MONGODB_DB_NAME + (import.meta.env.MODE === "test" ? "-test" : ""));
			await db.createCollection("studyGuides");
			return true;
		} catch (err) {
			console.error("Failed to create studyGuides collection:", err);
			return false;
		}
	},
	runEveryTime: false
};

export default migration;
