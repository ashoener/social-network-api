import { Router } from "express";
import { User } from "../../lib/models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
