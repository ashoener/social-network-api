import express from "express";
import loadRoutes from "./lib/routeLoader";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

await loadRoutes("controllers", app);

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
