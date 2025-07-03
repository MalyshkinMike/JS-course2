const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'progress.db');
const db = new sqlite3.Database(dbPath);

// Create table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS progress (
      userId TEXT,
      moduleId TEXT,
      status TEXT,
      PRIMARY KEY (userId, moduleId)
    )
  `);
});

module.exports = db;
