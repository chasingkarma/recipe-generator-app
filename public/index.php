<?php
require_once __DIR__ . '/../vendor/autoload.php';

use App\RecipeService;

// If no action is specified, serve the HTML page
if (!isset($_GET['action'])) {
    include __DIR__ . '/index.html';
    exit;
}

// Handle API calls
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$recipeService = new RecipeService();

$request = $_GET['action'] ?? '';

switch ($request) {
    case 'ingredients':
        echo json_encode($recipeService->getIngredients());
        break;
        
    case 'recipes':
        $selectedIngredients = $_POST['ingredients'] ?? [];
        if (empty($selectedIngredients)) {
            $selectedIngredients = json_decode(file_get_contents('php://input'), true)['ingredients'] ?? [];
        }
        
        $recipes = $recipeService->findRecipesByIngredients($selectedIngredients);
        echo json_encode(['recipes' => $recipes]);
        break;
        
    case 'recipe':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $recipe = $recipeService->getRecipeById($id);
            echo json_encode($recipe);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Recipe ID required']);
        }
        break;
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Invalid action']);
        break;
} 