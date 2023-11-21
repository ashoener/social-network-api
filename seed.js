import "dotenv/config";

import { faker } from "@faker-js/faker";
import { User, Thought } from "./lib/models/index.js";
import db from "./lib/config/connection.js";

// Seeding animation
const frames = ["|", "/", "—", "\\"];
let frame = 0;
process.stdout.write(`Seeding (${frames[frame]})`);
const seedingAnimation = setInterval(() => {
  frame++;
  if (frame > frames.length - 1) frame = 0;
  process.stdout.cursorTo(0);
  process.stdout.write(`Seeding (${frames[frame]})`);
}, 150);

await db.asPromise();

faker.seed(0);

let fakeUsers = faker.helpers.multiple(
  () => ({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    thoughts: [],
    friends: [],
  }),
  { count: 5 }
);

const fakeReactions = faker.helpers.multiple(
  () => ({
    reactionBody: faker.lorem.sentence(),
    username: faker.helpers.arrayElement(fakeUsers).username,
  }),
  { count: 10 }
);

// Create 1 thought per user
await Thought.collection.drop();
for (let user of fakeUsers) {
  const thought = {
    thoughtText: faker.lorem.sentence(),
    username: user.username,
    reactions: [faker.helpers.arrayElement(fakeReactions)],
  };
  const createdThought = await Thought.create(thought);
  user.thoughts.push(createdThought._id);
}

await User.collection.drop();
const users = await User.create(fakeUsers);

// Add 1 friend to each user
for (let i = 0; i < users.length; i++) {
  const user = users[i];
  user.friends.push(users[i + 1] || users[0]);
  await user.save();
}

// Clean up seeding animation
clearInterval(seedingAnimation);

process.stdout.clearLine(0);
process.stdout.cursorTo(0);

console.log("Successfully seeded db");
process.exit(0);
