require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');

const Recipe = require('./models/Recipe');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
  .catch(err => console.error('MongoDB error:', err));

// Helper to handle NaN
const parseNumber = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? null : num;
};

// Load data from JSON and insert (run once)
const loadData = async () => {
  const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

  for (let idx in data) {
    const item = data[idx];
    item.rating = parseNumber(item.rating);
    item.prep_time = parseNumber(item.prep_time);
    item.cook_time = parseNumber(item.cook_time);
    item.total_time = parseNumber(item.total_time);

    try {
      await Recipe.create(item);
    } catch (err) {
      console.error('Insert error:', err.message);
    }
  }
};

// Uncomment the following line to run this once and then comment it out
//loadData();

// --- GET all recipes paginated & sorted ---
app.get('/api/recipes', async (req, res) => {
  const page = parseInt(req.query.page || '1');
  const limit = parseInt(req.query.limit || '10');
  const skip = (page - 1) * limit;

  try {
    const total = await Recipe.countDocuments();
    const data = await Recipe.find()
      .sort({ rating: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ page, limit, total, data });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- GET recipes with search ---
app.get('/api/recipes/search', async (req, res) => {
  const { title, cuisine, calories, total_time, rating } = req.query;

  const query = {};

  if (title) {
    query.title = { $regex: title, $options: 'i' };
  }

  if (cuisine) {
    query.cuisine = { $regex: cuisine, $options: 'i' };
  }

  if (total_time) {
    const match = total_time.match(/(<=|>=|=|<|>)(\d+)/);
    if (match) {
      const [_, op, val] = match;
      query.total_time = { [`$${op.replace('=', 'eq')}`]: parseInt(val) };
    }
  }

  if (rating) {
    const match = rating.match(/(<=|>=|=|<|>)(\d+(\.\d+)?)/);
    if (match) {
      const [_, op, val] = match;
      query.rating = { [`$${op.replace('=', 'eq')}`]: parseFloat(val) };
    }
  }

  if (calories) {
    const match = calories.match(/(<=|>=|=|<|>)(\d+)/);
    if (match) {
      const [_, op, val] = match;
      query['nutrients.calories'] = {
        $exists: true,
        $regex: /^\d+/,
        $expr: {
          [`$${op.replace('=', 'eq')}`]: [{ $toInt: '$nutrients.calories' }, parseInt(val)]
        }
      };
    }
  }

  try {
    const data = await Recipe.find(query);
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Search error' });
  }
});


