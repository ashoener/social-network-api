import { Router } from "express";
import { Thought, User } from "../../lib/models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const thoughts = await Thought.find();
  res.json(thoughts);
});

export default router;
