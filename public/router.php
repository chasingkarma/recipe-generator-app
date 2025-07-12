<?php
// Simple router for PHP built-in server
$uri = $_SERVER['REQUEST_URI'];

// Remove query string
$uri = parse_url($uri, PHP_URL_PATH);

// Serve index.html for root
if ($uri === '/' || $uri === '/index.html') {
    return false; // Let the server serve index.html
}

// Handle API calls
if (strpos($uri, '/api/') === 0) {
    $action = substr($uri, 5); // Remove '/api/' prefix
    $_GET['action'] = $action;
    include __DIR__ . '/index.php';
    return true;
}

// For all other requests, try to serve the file
return false; 