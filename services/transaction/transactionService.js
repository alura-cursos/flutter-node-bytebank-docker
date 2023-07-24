const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();
app.use(bodyParser.json());

const transactions = [];

app.post('/create-transaction', (req, res) => {
  const { senderId, receiverId, amount, type } = req.body;
  const newTransaction = {
    id: uuid.v4(),
    senderId,
    receiverId,
    amount,
    type,
  };
  transactions.push(newTransaction);
  res.json({ message: 'Transaction created successfully', transaction: newTransaction });
});

app.get('/transactions', (req, res) => {
  const { transactionId, senderId } = req.query;

  if (transactionId) {
    const transaction = transactions.find((t) => t.id === transactionId);
    if (transaction) {
      return res.json(transaction);
    } else {
      return res.status(404).json({ message: 'Transaction not found' });
    }
  }

  if (senderId) {
    const transactionsFromSender = transactions.filter((t) => t.senderId === senderId);
    if (transactionsFromSender.length > 0) {
      return res.json(transactionsFromSender);
    } else {
      return res.status(404).json({ message: 'No transactions found for this sender' });
    }
  }

  return res.status(400).json({ message: 'Invalid query parameters' });
});

app.listen(3003, () => {
  console.log('Transaction service running on port 3003');
});
