<?php

// config/cors.php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Ensure API routes are covered
    'allowed_methods' => ['*'], // Allow all methods
    'allowed_origins' => ['*'], // Allow your frontend URL
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
 // Set to true if using authentication cookies
];
