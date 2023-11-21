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

router.post("/", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user)
    return res.status(400).json({ success: false, error: "User not found" });
  const thought = await Thought.create({
    thoughtText: req.body.thoughtText,
    username: req.body.username,
  });
  // Add thought to user
  await User.updateOne(
    { username: req.body.username },
    { $push: { thoughts: thought._id } }
  );
  res.json(thought);
});

router.put("/:id", async (req, res) => {
  const thought = await Thought.updateOne(
    {
      _id: req.params.id,
    },
    {
      thoughtText: req.body.thoughtText,
    }
  );
  res.json(thought);
});

router.delete("/:id", async (req, res) => {
  const thought = await Thought.findOneAndDelete({ _id: req.params.id });
  if (thought) {
    await User.updateOne(
      { username: thought.username },
      { $pull: { thoughts: thought._id } }
    );
    res.json(thought);
  } else {
    res.status(404).json({ success: false, error: "Thought not found" });
  }
});

export default router;
