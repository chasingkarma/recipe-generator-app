<?php

namespace App;

class RecipeService
{
    private $ingredients;
    private $recipes;

    public function __construct()
    {
        $this->loadIngredients();
        $this->loadRecipes();
    }

    private function loadIngredients()
    {
        $ingredientsData = file_get_contents(__DIR__ . '/../data/ingredients.json');
        $this->ingredients = json_decode($ingredientsData, true);
    }

    private function loadRecipes()
    {
        $recipesData = file_get_contents(__DIR__ . '/../data/recipes.json');
        $this->recipes = json_decode($recipesData, true);
    }

    public function getIngredients()
    {
        return $this->ingredients;
    }

    public function getRecipes()
    {
        return $this->recipes['recipes'];
    }

    public function findRecipesByIngredients($selectedIngredients)
    {
        $matchingRecipes = [];
        
        foreach ($this->recipes['recipes'] as $recipe) {
            $recipeIngredients = array_map('strtolower', $recipe['ingredients']);
            $selectedIngredientsLower = array_map('strtolower', $selectedIngredients);
            
            $matchingCount = 0;
            foreach ($selectedIngredientsLower as $ingredient) {
                if (in_array($ingredient, $recipeIngredients)) {
                    $matchingCount++;
                }
            }
            
            // Recipe matches if it contains at least 2 selected ingredients
            if ($matchingCount >= 2) {
                $recipe['matchScore'] = $matchingCount;
                $matchingRecipes[] = $recipe;
            }
        }
        
        // Sort by match score (highest first)
        usort($matchingRecipes, function($a, $b) {
            return $b['matchScore'] - $a['matchScore'];
        });
        
        return $matchingRecipes;
    }

    public function getRecipeById($id)
    {
        foreach ($this->recipes['recipes'] as $recipe) {
            if ($recipe['id'] == $id) {
                return $recipe;
            }
        }
        return null;
    }
} 