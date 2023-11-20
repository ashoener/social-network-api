import { Router } from "express";
import { Thought, User } from "../../lib/models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const thoughts = await Thought.find();
  res.json(thoughts);
});

router.get("/:id", async (req, res) => {
  const thought = await Thought.findById(req.params.id).select("-__v");
  res.json(thought);
});

export default router;
