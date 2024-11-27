const express = require("express");
const db = require("../models/db");
const router = express.Router();

router.get("/comments", (req, res) => {
  db.query("SELECT * FROM comments ORDER BY timestamp DESC", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

router.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  db.query(
    "INSERT INTO comments (username, comment) VALUES (?, ?)",
    [username, comment],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res
        .status(201)
        .json({
          id: results.insertId,
          username,
          comment,
          timestamp: new Date(),
        });
    }
  );
});

module.exports = router;
