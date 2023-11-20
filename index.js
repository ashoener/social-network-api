import express from "express";
import loadRoutes from "./lib/routeLoader.js";
import "dotenv/config";

import db from "./lib/config/connection.js";
import { User } from "./lib/models/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

await loadRoutes("controllers", app);

app.use((req, res) => {
  res.sendStatus(404);
});

db.once("open", () => {
  app.listen(PORT, "127.0.0.1", () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
});
