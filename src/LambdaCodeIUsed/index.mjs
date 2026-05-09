import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv"
dotenv.config()

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

let client;
let cachedDb;

const connectDB = async () => {
    console.log(" Before Mongo connect");

    if (cachedDb) {
        console.log(" Using cached DB");
        return cachedDb;
    }

    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log(" MongoDB connected");
    }

    cachedDb = client.db(DB_NAME);

    console.log(" DB ready:", DB_NAME);

    return cachedDb;
};

export const handler = async (event) => {
    // context.callbackWaitsForEmptyEventLoop = false;

    console.log(" Lambda invoked");
    console.log(" Event received:", JSON.stringify(event));

    const db = await connectDB();
    const users = db.collection("users");

    console.log(" Processing records count:", event.Records?.length);

    for (const record of event.Records) {
        try {
            console.log(" Raw S3 key:", record.s3.object.key);

            const fullKey = decodeURIComponent(
                record.s3.object.key.replace(/\+/g, " ")
            );
            // social_media_App/users/69f3455d335e612b6704eb74/2e86389c-b401-45e4-a198-3146a982ea73__one5555.png
            console.log(" Parsed fullKey:", fullKey);

            const parts = fullKey.split("/");  //[]
            console.log(" Parts:", parts);

            const customId = parts[2];
            console.log(" customId:", customId);

            if (!customId) {
                console.log(" Invalid key format, skipping");
                continue;
            }

            console.log(" Before updateOne");

            const result = await users.updateOne(
                { _id: new ObjectId(customId) },
                {
                    $set: {
                        profilePic: fullKey,
                        updatedAt: new Date(),
                    },
                }
            );

            console.log(" Update result:", {
                matched: result.matchedCount,
                modified: result.modifiedCount,
            });

        } catch (error) {
            console.error(" Error processing record:", {
                message: error.message,
                stack: error.stack,
            });
        }
    }

    console.log(" Lambda finished successfully");

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "done" }),
    };
};

