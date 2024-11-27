const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

router.post("/login", (req, res) => {
  const username = req.body.username;
  if (!username) return res.status(400).send("Username is required");
  const sessionId = uuidv4();
  res.json({ sessionId });
});

module.exports = router;
