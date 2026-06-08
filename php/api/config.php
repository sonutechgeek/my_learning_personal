<?php

define('DB_HOST', '127.0.0.1');
define('DB_NAME', 'learning_db');
define('DB_USER', 'root');
define('DB_PASS', 'NewStrongPassword123');

function getConnection(): PDO {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8";
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'DB connection failed: ' . $e->getMessage()]);
        exit;
    }
}
