<?php
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/core/Model.php';
require_once __DIR__ . '/core/Controller.php';
require_once __DIR__ . '/core/Router.php';
require_once __DIR__ . '/app/models/UserModel.php';
require_once __DIR__ . '/app/controllers/PageController.php';
require_once __DIR__ . '/app/controllers/AuthController.php';
require_once __DIR__ . '/app/controllers/UserController.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

$router = new Router();

// ── Page Routes ─────────────────────────────
$router->add('GET', '/',          'PageController', 'login');
$router->add('GET', '/login',     'PageController', 'login');
$router->add('GET', '/signup',    'PageController', 'signup');
$router->add('GET', '/dashboard', 'PageController', 'dashboard');

// ── Auth API ────────────────────────────────
$router->add('POST', '/api/auth/signup', 'AuthController', 'signup');
$router->add('POST', '/api/auth/login',  'AuthController', 'login');
$router->add('POST', '/api/auth/logout', 'AuthController', 'logout');
$router->add('GET',  '/api/auth/me',     'AuthController', 'me');

// ── Users API ───────────────────────────────
$router->add('GET',    '/api/users',      'UserController', 'index');
$router->add('GET',    '/api/users/{id}', 'UserController', 'show');
$router->add('POST',   '/api/users',      'UserController', 'store');
$router->add('PUT',    '/api/users/{id}', 'UserController', 'update');
$router->add('DELETE', '/api/users/{id}', 'UserController', 'destroy');

$router->dispatch();
