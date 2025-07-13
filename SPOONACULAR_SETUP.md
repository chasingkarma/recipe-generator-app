# Spoonacular API Setup Guide

## Step 1: Get Your API Key

1. Go to [Spoonacular Food API](https://spoonacular.com/food-api)
2. Click "Get API Key" in the top right
3. Sign up or log in to your account
4. Go to your profile → "API Key" section
5. Copy your API key (looks like: `abc123def456ghi789`)

## Step 2: Add Your API Key

1. Open `public/index.html`
2. Find the CONFIG section at the top (around line 120):
   ```javascript
   const CONFIG = {
       SPOONACULAR_API_KEY: 'YOUR_SPOONACULAR_API_KEY', // Replace with your actual API key
       ENABLE_API_RECIPES: true,
       MAX_API_RECIPES: 5,
       MAX_GENERATED_RECIPES: 3
   };
   ```
3. Replace `'YOUR_SPOONACULAR_API_KEY'` with your actual API key
4. Save the file

## Step 3: Test the Integration

1. Start the server: `php -S localhost:8001 -t public`
2. Visit: http://localhost:8001
3. Select ingredients like "onion", "tomato", "potato"
4. Click "Find Recipes"
5. You should see recipes from Spoonacular with green badges

## Features

✅ **Real Chef-Tested Recipes** from Spoonacular  
✅ **Vegetarian Filtering** - automatically excludes non-vegetarian recipes  
✅ **Color-Coded Ingredients** - green for available, red for missing  
✅ **Source Badges** - clearly shows API vs AI-generated recipes  
✅ **Fallback System** - uses AI recipes if API fails  
✅ **Free Tier** - 5,000 requests/month  

## Configuration Options

```javascript
const CONFIG = {
    SPOONACULAR_API_KEY: 'your-api-key-here',
    ENABLE_API_RECIPES: true,        // Set to false to use only AI recipes
    MAX_API_RECIPES: 5,              // Max API recipes to fetch
    MAX_GENERATED_RECIPES: 3         // Max AI recipes to generate
};
```

## Troubleshooting

- **No API recipes showing**: Check your API key is correct
- **Rate limit errors**: You've exceeded 5,000 requests/month
- **Network errors**: Check your internet connection
- **Fallback to AI recipes**: API is unavailable, using generated recipes

## Benefits of Spoonacular

- 🍽️ **5,000+ vegetarian recipes**
- 🧪 **Tested by real chefs**
- 📊 **Nutritional information**
- 🕒 **Accurate cooking times**
- 🌍 **International cuisines**
- 📱 **Mobile-friendly instructions** 