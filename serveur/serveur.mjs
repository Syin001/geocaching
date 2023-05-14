import express from "express";
import caches from "./route/caches.mjs";
import logins from "./route/logins.mjs";
import ranking from "./route/ranking.mjs";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
// Load the /posts routes
app.use("/caches", caches);
app.use("/logins", logins);
app.use("/ranking", ranking);
// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Error.");
});

// start the Express server
app.listen(3000, () => {
  console.log("Running...");
});
