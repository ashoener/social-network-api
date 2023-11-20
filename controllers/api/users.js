import { Router } from "express";
import { User } from "../../lib/models/index.js";

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

export default router;
