const express = require("express");
const Post = require("../src/models/Post");

const router = express.Router();

// Get all public posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find({ public: true });
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

// Get all posts for a specific user
router.get("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ user: userId });
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

// Create a new post
router.post("/", async (req, res, next) => {
  try {
    const { title, content, public } = req.body;
    const post = new Post({ title, content, public });
    await post.save();
    res.send(post);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
