import { MongoClient } from "mongodb";
const mongo_url =
  "mongodb+srv://user1:user1@cluster0.taijozi.mongodb.net/?retryWrites=true&w=majority";
const connectionString = mongo_url;

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db("cachfinders");

export default db;
