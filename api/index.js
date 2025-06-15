const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());

app.get('/api/ranks', (req, res) => {
  const { province, type } = req.query;
  const file = path.join(__dirname, 'data', 'ranks.json');
  if (!fs.existsSync(file)) return res.status(500).json({ error:'data not ready' });
  
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const obj = data[province]?.[type];
  if (!obj) return res.status(404).json({ error:'no data' });
  
  res.json(obj);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
