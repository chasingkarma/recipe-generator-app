# Vegetarian Recipe Generator

A modern web application that helps users discover delicious vegetarian recipes based on available ingredients. Perfect for Indian and international vegetarian cooking!

## Features

- **Categorized Ingredients**: Browse ingredients organized by vegetables, spices, grains, and protein sources
- **Smart Recipe Matching**: Find recipes that use your selected ingredients
- **Detailed Instructions**: Step-by-step numbered cooking instructions
- **Recipe Navigation**: Browse through multiple recipes with Previous/Next buttons
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## Recipe Categories

The application includes recipes for:
- **Indian Vegetarian Dishes**: Paneer Butter Masala, Dal Makhani, Vegetable Biryani, etc.
- **International Cuisine**: Thai Red Curry with Tofu, Quinoa Vegetable Stir Fry
- **Quick & Easy**: Vegetable Stir Fry, Mushroom Masala, Lentil Soup

## Installation & Setup

### Prerequisites
- PHP 8.0 or higher
- Composer
- Web server (Apache/Nginx) or PHP built-in server

### Installation Steps

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   composer install
   ```

3. **Start the development server**:
   ```bash
   # Using PHP built-in server
   php -S localhost:8000 -t public
   
   # Or using Apache/Nginx
   # Point your web server to the 'public' directory
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:8000`

## How to Use

1. **Select Ingredients**: Browse through the categorized ingredients and select the ones you have available
2. **Find Recipes**: Click "Find Recipes" to discover dishes you can make
3. **Browse Recipes**: View recipe cards with cooking time and key ingredients
4. **View Details**: Click on any recipe to see detailed instructions
5. **Navigate**: Use Previous/Next buttons to browse through all matching recipes

## Project Structure

```
├── composer.json              # PHP dependencies
├── data/
│   ├── ingredients.json      # Categorized ingredients data
│   └── recipes.json         # Recipe database
├── public/
│   ├── index.html           # Main application page
│   ├── index.php            # PHP API endpoints
│   ├── css/
│   │   └── style.css        # Application styles
│   └── js/
│       └── app.js           # Frontend JavaScript
├── src/
│   └── RecipeService.php    # Backend recipe logic
└── vendor/                  # Composer dependencies
```

## API Endpoints

- `GET index.php?action=ingredients` - Get all categorized ingredients
- `POST index.php?action=recipes` - Find recipes by selected ingredients
- `GET index.php?action=recipe&id={id}` - Get specific recipe details

## Technology Stack

- **Backend**: PHP 8.0+ with Composer
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with modern features (Grid, Flexbox, Animations)
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Poppins)

## Customization

### Adding New Recipes
Edit `data/recipes.json` to add new recipes:
```json
{
  "id": 11,
  "name": "Your Recipe Name",
  "time": "30 minutes",
  "ingredients": ["Ingredient 1", "Ingredient 2"],
  "instructions": [
    "Step 1 instruction",
    "Step 2 instruction"
  ]
}
```

### Adding New Ingredients
Edit `data/ingredients.json` to add ingredients to existing categories or create new ones.

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to contribute by:
- Adding new recipes
- Improving the UI/UX
- Adding new features
- Reporting bugs

## Support

For issues or questions, please create an issue in the project repository. 