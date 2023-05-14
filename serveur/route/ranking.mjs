import express from "express";
import db from "../conn.mjs";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const router = express.Router();
const access_token =
  "5d856f57015b4678a146ef8093f6b21f9548aad06edba425241a27b69a1a9aa539fb8589df5997f4cf12a8d192cb7545593830992a4aef9629cedfeaebc62d28";

// Get a list of 50 caches
router.get("/", authenticateToken, async (req, res) => {
  let collection = await db.collection("logins");
  let results = await collection.aggregate([
    { $unwind: "$caches" },
    { $group: { _id: "$_id", email:{"$first":"$email"} , len: { $sum: 1 } } },
    { $sort: { len: -1 } },
    { $limit: 10 },
  ]).toArray();
  res.send(results).status(200);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authentication;
  console.log("authenticateToken ", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  console.log("authenticateToken the token is ", token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, access_token, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export default router;
