import express from "express";
import db from "../conn.mjs";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const router = express.Router();
const access_token =
  "5d856f57015b4678a146ef8093f6b21f9548aad06edba425241a27b69a1a9aa539fb8589df5997f4cf12a8d192cb7545593830992a4aef9629cedfeaebc62d28";

// Add a new document to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection("logins");
  let connectionid = req.body;
  console.log(connectionid);
  let exist = await collection.findOne(connectionid);
  if (exist == null) {
    connectionid.caches = [];
    await collection.insertOne(connectionid);
    const token = jwt.sign(connectionid, access_token);
    res.send({ token: token.toString() }).status(201);
  } else {
    res.send({ token: "" }).status(401);
  }
});

// Add a new document to the collection
router.patch("/", async (req, res) => {
  let collection = await db.collection("logins");
  let connectionid = req.body;
  console.log(connectionid);
  let exist = await collection.findOne(connectionid);
  if (exist == null) {
    res.send({ token: "" }).status(401);
  } else {
    const token = jwt.sign(connectionid, access_token);
    console.log("token create login\n", token);
    res.send({ token: token.toString() }).status(201);
  }
});

export default router;
