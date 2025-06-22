import { ObjectId } from "mongodb";
import type { Migration } from ".";
import type { Database } from "$lib/server/database";
import { env } from "$env/dynamic/private";

const migration: Migration = {
    _id: new ObjectId("5c9e4e4e4c4c4c4c4c4c4c4c"),
    name: "Create User Progress Collection",

    async up(client: Database): Promise<boolean> {
        try {
            const db = client.getClient().db(env.MONGODB_DB_NAME + (import.meta.env.MODE === "test" ? "-test" : ""));
            await db.createCollection("userProgress", {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["userId", "studyGuideId", "modules"],
                        properties: {
                            userId: {
                                bsonType: "objectId",
                                description: "must be an ObjectId and is required"
                            },
                            studyGuideId: {
                                bsonType: "objectId",
                                description: "must be an ObjectId and is required"
                            },
                            modules: {
                                bsonType: "array",
                                description: "array of module progress objects"
                            }
                        }
                    }
                }
            });
            return true;
        } catch (err) {
            console.error("Failed to create userProgress collection:", err);
            return false;
        }
    },
    runEveryTime: false
};

export default migration;
