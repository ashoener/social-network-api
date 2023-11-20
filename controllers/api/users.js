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

export default router;
