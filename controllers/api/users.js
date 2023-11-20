import { Router } from "express";
import { Thought, User } from "../../lib/models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-__v")
    .populate(["thoughts", "friends"]);
  res.json(user);
});

router.post("/", async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
  });
  res.json(user);
});

router.route("/:id/friends/:friendId").post(async (req, res) => {
  const user = await User.updateOne(
    { _id: req.params.id },
    { $addToSet: { friends: req.params.friendId } },
    { new: true }
  );
  res.json(user);
});

router.put("/:id", async (req, res) => {
  const user = await User.updateOne(
    {
      _id: req.params.id,
    },
    {
      username: req.body.username,
      email: req.body.email,
    }
  );
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });
  if (user) {
    await Thought.deleteMany({ username: user.username });
  }

  res.json({ success: true });
});

export default router;
