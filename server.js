const express = require('express');
const path = require('path');
require('./bot/index.js');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Quantum-Forge is active and maintaining quantum stability...');
});

app.listen(port, () => {
  console.log(`Quantum-Forge server is running on port ${port}`);
});

