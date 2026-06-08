<?php
class Database {
    private static ?PDO $instance = null;

    public static function connect(): PDO {
        if (self::$instance) return self::$instance;
        try {
            self::$instance = new PDO(
                'mysql:host=127.0.0.1;dbname=learning_db;charset=utf8',
                'root',
                'NewStrongPassword123'
            );
            self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(['error' => 'DB error: ' . $e->getMessage()]));
        }
        return self::$instance;
    }
}
