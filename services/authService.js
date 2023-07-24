const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();
app.use(bodyParser.json());

const users = [];

app.post('/signup', (req, res) => {
  const { email, password, name } = req.body;
  const newUser = { id: uuid.v4(), email, password, name };
  users.push(newUser);
  res.json({ message: 'User created successfully' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(3001, () => {
  console.log('Authentication service running on port 3001');
});
