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
  "data": [
    {
      "nutrients": {
        "calories": "210 kcal",
        "carbohydrateContent": "24 g",
        "cholesterolContent": "20 mg",
        "fiberContent": "1 g",
        "proteinContent": "4 g",
        "saturatedFatContent": "6 g",
        "sodiumContent": "400 mg",
        "sugarContent": "2 g",
        "fatContent": "11 g",
        "unsaturatedFatContent": "0 g"
      },
      "_id": "67f77a518c3d4ebd47f0616b",
      "Country_State": "US",
      "cuisine": "Southern Recipes",
      "title": "Classic Buttermilk Biscuits",
      "URL": "https://www.allrecipes.com/recipe/220943/chef-johns-buttermilk-biscuits/",
      "rating": 4.9,
      "total_time": 30,
      "prep_time": 15,
      "cook_time": 15,
      "description": "These Southern-style buttermilk biscuits are fluffy and buttery with a golden crust — perfect with gravy or jam.",
      "ingredients": [
        "2 cups all-purpose flour",
        "1 tablespoon baking powder",
        "0.25 teaspoon baking soda",
        "1 teaspoon salt",
        "6 tablespoons unsalted butter, cold and cubed",
        "1 cup buttermilk"
      ],
      "instructions": [
        "Preheat oven to 425 degrees F (220 degrees C).",
        "In a large bowl, whisk together flour, baking powder, baking soda, and salt.",
        "Cut in butter using a pastry cutter or fork until mixture resembles coarse crumbs.",
        "Stir in buttermilk just until dough comes together. Do not overmix.",
        "Turn dough out onto a floured surface, pat to 1-inch thickness, and cut into rounds.",
        "Place on a baking sheet and bake until golden brown, 12 to 15 minutes."
      ],
      "serves": "6 servings",
      "__v": 0
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
