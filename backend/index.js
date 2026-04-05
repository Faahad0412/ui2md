const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'UI-to-MD Extractor Backend API' });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
