const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.post('/api/register', async (req, res) => {
  const { fullName, email, birthDate, phone, terms } = req.body;

  console.log('Received data:', req.body);

  try {
    const result = await db.query(
      'INSERT INTO users (full_name, email, birth_date, phone, terms) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [fullName, email, birthDate, phone, terms]
    );

    console.log('Query result:', result.rows);

    res.status(201).json({
      status: 'success',
      data: {
        user: result.rows[0],
      },
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while registering the user',
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});