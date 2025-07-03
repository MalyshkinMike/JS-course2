const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Get progress for a user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  db.all('SELECT moduleId, status FROM progress WHERE userId = ?', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Save progress (upsert)
router.post('/:userId', (req, res) => {
  const { userId } = req.params;
  const { moduleId, status } = req.body;

  const stmt = db.prepare(`
    INSERT INTO progress (userId, moduleId, status)
    VALUES (?, ?, ?)
    ON CONFLICT(userId, moduleId) DO UPDATE SET status = excluded.status
  `);

  stmt.run(userId, moduleId, status, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });

  stmt.finalize();
});

module.exports = router;
