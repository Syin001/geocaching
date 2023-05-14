import express from "express";
import db from "../conn.mjs";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
const router = express.Router();
const access_token =
  "5d856f57015b4678a146ef8093f6b21f9548aad06edba425241a27b69a1a9aa539fb8589df5997f4cf12a8d192cb7545593830992a4aef9629cedfeaebc62d28";

// get a cache
router.get("/:id", authenticateToken, async (req, res) => {
  let collection = await db.collection("caches");
  let collectionuser = await db.collection("logins");
  let usercaches = await collectionuser.findOne({
    email: req.user.email,
    password: req.user.password,
  });
  let cachesarray = usercaches.caches;
  let resultsjson = await collection
    .find({ _id: new ObjectId(req.params.id) })
    .limit(50)
    .toArray();
  resultsjson = resultsjson[0];
  let result = { caches: resultsjson };
  console.log(cachesarray, resultsjson._id);
  if (req.user.email == resultsjson.user.email) {
    result.modifiable = "1";
  } else {
    if (cachesarray.includes(resultsjson._id.toString())) {
      result.modifiable = "-1";
    } else {
      result.modifiable = "0";
    }
  }
  res.send(result).status(200);
});

// Get a list of 50 caches
router.get("/", authenticateToken, async (req, res) => {
  let collection = await db.collection("caches");
  let results = await collection.find({}).limit(50).toArray();
  res.send(results).status(200);
});

// Add a new document to the collection
router.post("/", authenticateToken, async (req, res) => {
  let collection = await db.collection("caches");
  let newDocument = req.body;
  newDocument.user = { email: req.user.email, password: req.user.password };
  let result = await collection.insertOne(newDocument);
  res.send(result).status(200);
});

// modify cache data
router.patch("/:id", authenticateToken, async (req, res) => {
  let collection = await db.collection("caches");
  let id = req.params.id;
  let replaceDocument = req.body;
  replaceDocument._id = new ObjectId(id);
  replaceDocument.user = { email: req.user.email, password: req.user.password };
  let result = await collection.findOneAndReplace(
    { _id: new ObjectId(id) },
    replaceDocument
  );
  res.send(result);
});

// Delete a cache
router.delete("/", authenticateToken, async (req, res) => {
  const query = { _id: new ObjectId(req.query.id) };
  const collection = db.collection("caches");
  let result = await collection.findOneAndDelete(query);

  res.send(result).status(200);
});
// validate a cache
router.get("/validate/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  const user = { email: req.user.email, password: req.user.password };
  const collection = db.collection("logins");
  let result = await collection.findOne(user);
  result.caches.push(id);
  collection.findOneAndReplace(user, result);
  res.send().status(200);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authentication;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, access_token, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.get("");

export default router;
