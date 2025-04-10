# 🍽️ Recipe API

A simple RESTful API built with Node.js, Express, and MongoDB to serve and search for recipes. This API supports pagination, sorting, and advanced filtering based on cuisine, title, total time, rating, and calories.

---

## 📦 Features

- 🌍 Get all recipes with pagination and rating-based sorting
- 🔍 Search recipes by:
  - Title (partial match)
  - Cuisine
  - Total time (`<`, `>`, `<=`, `>=`, `=`)
  - Rating (`<`, `>`, `<=`, `>=`, `=`)
  - Calories (`<`, `>`, `<=`, `>=`, `=`, parsed from `nutrients.calories`)
- 🧾 Schema includes nutrients, ingredients, instructions, prep time, cook time, and more
- 🔁 One-time JSON file data load utility (via `loadData()`)

---

## 🛠️ Installation

```bash
git clone https://github.com/shemzegem200/BackendRecipes.git
cd BackendRecipes
npm install
```

Create a `.env` file and add your MongoDB URI:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/recipes
```

---

## 🚀 Running the Server

```bash
node index.js
npm start
```

Server will start on `http://localhost:5000`.

---

## 🍳 API Endpoints

### ➕ (Optional) Load Initial Data

Uncomment and run the `loadData()` function inside `index.js` once to populate your MongoDB collection from `data.json`.

---

### ✅ GET /api/recipes

Get all recipes (paginated and sorted by `rating` descending).

**Query Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page  | int  | 1       | Page number |
| limit | int  | 10      | Items per page |

**Example:**

```http
GET /api/recipes?page=1&limit=10
```

---

### 🔍 GET /api/recipes/search

Search recipes by title, cuisine, rating, total time, and calories.

**Query Parameters (all optional):**

| Param      | Type   | Example         | Description                             |
|------------|--------|------------------|-----------------------------------------|
| title      | string | `Pasta`         | Partial title match                     |
| cuisine    | string | `Italian`       | Partial cuisine match                   |
| rating     | string | `>=4.5`         | Rating filter with operator             |
| total_time | string | `<30`           | Total time filter with operator         |
| calories   | string | `<=300`         | Calories filter from nested `nutrients` |

**Example:**

```http
GET /api/recipes/search?title=Biscuits&cuisine=Southern&total_time=<=30
```

---

## 📄 Sample Response

```json
{
  "page": 1,
  "limit": 10,
  "total": 3,
  "data": [
    {
      "_id": "...",
      "title": "Classic Buttermilk Biscuits",
      "cuisine": "Southern Recipes",
      "rating": 4.9,
      "total_time": 30,
      "ingredients": [...],
      "instructions": [...],
      "nutrients": {
        "calories": "210 kcal",
        "fatContent": "11 g",
        ...
      }
    }
  ]
}
```

---

## 🧠 Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- dotenv
- cors

---

## 📂 Project Structure

```
.
├── data.json             # Recipe data to import
├── index.js              # Main server file
├── models/
│   └── Recipe.js         # Mongoose schema
├── .env                  # Environment config
```

---

## 📌 Notes

- The calorie filter uses regex and MongoDB `$expr` for numeric comparison on a string field like `"210 kcal"`.
- Avoid running `loadData()` multiple times to prevent duplicate entries.

---
