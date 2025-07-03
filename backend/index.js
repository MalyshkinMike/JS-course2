const express = require('express');
const cors = require('cors');
const app = express();
const progressRoutes = require('./routes/progress');

app.use(cors()); // Allow frontend access
app.use(express.json()); // Parse JSON request bodies

app.use('/api/progress', progressRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
