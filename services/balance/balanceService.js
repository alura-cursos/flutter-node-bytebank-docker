const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();
app.use(bodyParser.json());

const accounts = [];

app.post('/create-pin', (req, res) => {
  const { userId, password } = req.body;
  const user = users.find((u) => u.id === userId && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const newPin = uuid.v4();
  accounts.push({ userId, pin: newPin });
  res.json({ message: 'PIN created successfully' });
});

app.post('/check-balance', (req, res) => {
  const { userId, pin } = req.body;
  const account = accounts.find((acc) => acc.userId === userId && acc.pin === pin);
  if (!account) {
    return res.status(401).json({ message: 'Invalid PIN' });
  }

  // Replace this with a more elaborate balance retrieval mechanism (e.g., database lookup).
  res.json({ balance: 1000 });
});

app.listen(3002, () => {
  console.log('Balance service running on port 3002');
});
