class RecipeApp {
    constructor() {
        this.selectedIngredients = [];
        this.recipes = [];
        this.currentRecipeIndex = 0;
        this.ingredients = {};
        
        this.init();
    }

    async init() {
        await this.loadIngredients();
        this.setupEventListeners();
        this.renderIngredients();
    }

    async loadIngredients() {
        try {
            const response = await fetch('index.php?action=ingredients');
            this.ingredients = await response.json();
        } catch (error) {
            console.error('Error loading ingredients:', error);
        }
    }

    setupEventListeners() {
        // Find recipes button
        document.getElementById('find-recipes-btn').addEventListener('click', () => {
            this.findRecipes();
        });

        // Back to ingredients button
        document.getElementById('back-to-ingredients').addEventListener('click', () => {
            this.showIngredientsSection();
        });

        // Back to recipes button
        document.getElementById('back-to-recipes').addEventListener('click', () => {
            this.showRecipesSection();
        });

        // Start over button
        document.getElementById('start-over-btn').addEventListener('click', () => {
            this.startOver();
        });

        // Additional ingredients input handlers
        this.setupAdditionalIngredientsHandlers();
    }

    setupAdditionalIngredientsHandlers() {
        const additionalInputs = [
            'additional-vegetables',
            'additional-spices', 
            'additional-grains',
            'additional-protein'
        ];

        additionalInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('blur', () => {
                    this.handleAdditionalIngredients();
                });
            }
        });
    }

    handleAdditionalIngredients() {
        const additionalInputs = [
            'additional-vegetables',
            'additional-spices',
            'additional-grains', 
            'additional-protein'
        ];

        additionalInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input && input.value.trim()) {
                const ingredients = input.value.split(',').map(item => item.trim()).filter(item => item);
                ingredients.forEach(ingredient => {
                    if (!this.selectedIngredients.includes(ingredient)) {
                        this.selectedIngredients.push(ingredient);
                    }
                });
            }
        });

        this.updateSelectedIngredientsDisplay();
        this.updateFindRecipesButton();
    }

    startOver() {
        // Clear all selections
        this.selectedIngredients = [];
        
        // Clear checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Clear additional ingredients inputs
        const additionalInputs = [
            'additional-vegetables',
            'additional-spices',
            'additional-grains',
            'additional-protein'
        ];

        additionalInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.value = '';
            }
        });

        // Clear dietary restrictions
        const dietaryInput = document.getElementById('dietary-restrictions');
        if (dietaryInput) {
            dietaryInput.value = '';
        }

        // Clear selected ingredients display
        this.updateSelectedIngredientsDisplay();
        this.updateFindRecipesButton();

        // Show ingredients section
        this.showIngredientsSection();
    }

    renderIngredients() {
        const grid = document.getElementById('ingredients-grid');
        grid.innerHTML = '';

        Object.entries(this.ingredients).forEach(([category, ingredients]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'ingredient-category';
            
            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = this.capitalizeFirst(category);
            categoryDiv.appendChild(categoryTitle);

            ingredients.forEach(ingredient => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'ingredient-item';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `ingredient-${ingredient}`;
                checkbox.value = ingredient;
                
                const label = document.createElement('label');
                label.htmlFor = `ingredient-${ingredient}`;
                label.textContent = ingredient;
                
                itemDiv.appendChild(checkbox);
                itemDiv.appendChild(label);
                
                // Add click event to the entire item
                itemDiv.addEventListener('click', (e) => {
                    if (e.target.type !== 'checkbox') {
                        checkbox.checked = !checkbox.checked;
                    }
                    this.handleIngredientSelection(ingredient, checkbox.checked);
                });
                
                // Add change event to checkbox
                checkbox.addEventListener('change', (e) => {
                    this.handleIngredientSelection(ingredient, e.target.checked);
                });
                
                categoryDiv.appendChild(itemDiv);
            });
            
            grid.appendChild(categoryDiv);
        });
    }

    handleIngredientSelection(ingredient, isSelected) {
        if (isSelected) {
            if (!this.selectedIngredients.includes(ingredient)) {
                this.selectedIngredients.push(ingredient);
            }
        } else {
            this.selectedIngredients = this.selectedIngredients.filter(item => item !== ingredient);
        }
        
        this.updateSelectedIngredientsDisplay();
        this.updateFindRecipesButton();
    }

    updateSelectedIngredientsDisplay() {
        const container = document.getElementById('selected-ingredients-list');
        container.innerHTML = '';
        
        this.selectedIngredients.forEach(ingredient => {
            const ingredientDiv = document.createElement('div');
            ingredientDiv.className = 'selected-ingredient';
            
            const text = document.createElement('span');
            text.textContent = ingredient;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.innerHTML = '×';
            removeBtn.addEventListener('click', () => {
                this.removeIngredient(ingredient);
            });
            
            ingredientDiv.appendChild(text);
            ingredientDiv.appendChild(removeBtn);
            container.appendChild(ingredientDiv);
        });
    }

    removeIngredient(ingredient) {
        this.selectedIngredients = this.selectedIngredients.filter(item => item !== ingredient);
        
        // Uncheck the corresponding checkbox
        const checkbox = document.getElementById(`ingredient-${ingredient}`);
        if (checkbox) {
            checkbox.checked = false;
        }
        
        this.updateSelectedIngredientsDisplay();
        this.updateFindRecipesButton();
    }

    updateFindRecipesButton() {
        const button = document.getElementById('find-recipes-btn');
        button.disabled = this.selectedIngredients.length < 2;
    }

    async findRecipes() {
        if (this.selectedIngredients.length < 2) {
            alert('Please select at least 2 ingredients to find recipes.');
            return;
        }

        // Handle additional ingredients before searching
        this.handleAdditionalIngredients();

        this.showLoading(true);
        
        try {
            const response = await fetch('index.php?action=recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ingredients: this.selectedIngredients
                })
            });
            
            const data = await response.json();
            this.recipes = data.recipes;
            
            if (this.recipes.length === 0) {
                alert('No recipes found with the selected ingredients. Try selecting different ingredients.');
                this.showLoading(false);
                return;
            }
            
            this.showRecipesSection();
            this.renderRecipes();
        } catch (error) {
            console.error('Error finding recipes:', error);
            alert('Error finding recipes. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    renderRecipes() {
        const container = document.getElementById('recipes-container');
        container.innerHTML = '';
        
        this.recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.addEventListener('click', () => {
                this.showRecipeDetail(index);
            });
            
            recipeCard.innerHTML = `
                <h3>${recipe.name}</h3>
                <div class="time">
                    <i class="fas fa-clock"></i>
                    ${recipe.time}
                </div>
                <div class="ingredients">
                    <strong>Ingredients:</strong> ${recipe.ingredients.slice(0, 5).join(', ')}${recipe.ingredients.length > 5 ? '...' : ''}
                </div>
            `;
            
            container.appendChild(recipeCard);
        });
    }

    async showRecipeDetail(index) {
        this.currentRecipeIndex = index;
        const recipe = this.recipes[index];
        
        const container = document.getElementById('recipe-detail-container');
        container.innerHTML = `
            <h1 class="recipe-title">${recipe.name}</h1>
            <div class="recipe-time">
                <i class="fas fa-clock"></i>
                ${recipe.time}
            </div>
            
            <div class="recipe-ingredients">
                <h3>Ingredients</h3>
                <div class="ingredients-list">
                    ${recipe.ingredients.map(ingredient => 
                        `<div class="ingredient-tag">${ingredient}</div>`
                    ).join('')}
                </div>
            </div>
            
            <div class="recipe-instructions">
                <h3>Instructions</h3>
                <ol class="instructions-list">
                    ${recipe.instructions.map(instruction => 
                        `<li>${instruction}</li>`
                    ).join('')}
                </ol>
            </div>
            
            <div class="recipe-navigation">
                <button class="btn btn-secondary nav-btn" id="prev-recipe" ${index === 0 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i> Previous
                </button>
                <span>Recipe ${index + 1} of ${this.recipes.length}</span>
                <button class="btn btn-secondary nav-btn" id="next-recipe" ${index === this.recipes.length - 1 ? 'disabled' : ''}>
                    Next <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
        
        // Add navigation event listeners
        document.getElementById('prev-recipe').addEventListener('click', () => {
            if (this.currentRecipeIndex > 0) {
                this.showRecipeDetail(this.currentRecipeIndex - 1);
            }
        });
        
        document.getElementById('next-recipe').addEventListener('click', () => {
            if (this.currentRecipeIndex < this.recipes.length - 1) {
                this.showRecipeDetail(this.currentRecipeIndex + 1);
            }
        });
        
        this.showRecipeDetailSection();
    }

    showIngredientsSection() {
        document.getElementById('ingredients-section').style.display = 'block';
        document.getElementById('recipes-section').style.display = 'none';
        document.getElementById('recipe-detail-section').style.display = 'none';
    }

    showRecipesSection() {
        document.getElementById('ingredients-section').style.display = 'none';
        document.getElementById('recipes-section').style.display = 'block';
        document.getElementById('recipe-detail-section').style.display = 'none';
    }

    showRecipeDetailSection() {
        document.getElementById('ingredients-section').style.display = 'none';
        document.getElementById('recipes-section').style.display = 'none';
        document.getElementById('recipe-detail-section').style.display = 'block';
    }

    showLoading(show) {
        document.getElementById('loading').style.display = show ? 'flex' : 'none';
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RecipeApp();
}); 