<?php
require 'config.php';

// ── Headers ─────────────────────────────────────────────────
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); exit;
}

// ── Router ──────────────────────────────────────────────────
$method = $_SERVER['REQUEST_METHOD'];
$uri    = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$parts  = explode('/', $uri);
$conn   = getConnection();
$body   = json_decode(file_get_contents('php://input'), true) ?? [];

$resource = $parts[0] ?? '';          // "users" | "auth"
$action   = $parts[1] ?? '';          // "login" | "signup" | "logout" | "me"
$id       = is_numeric($action) ? (int)$action : null;

// ── Routes ──────────────────────────────────────────────────
if ($resource === 'auth') {
    match ($action) {
        'signup' => signup($conn, $body),
        'login'  => login($conn, $body),
        'logout' => logout($conn),
        'me'     => me($conn),
        default  => response(404, ['error' => 'Auth route not found']),
    };
}

if ($resource === 'users') {
    // Protected routes — require valid token
    $authUser = requireAuth($conn);

    match ($method) {
        'GET'    => $id ? getUser($conn, $id)              : getAllUsers($conn),
        'POST'   => createUser($conn, $body),
        'PUT'    => $id ? updateUser($conn, $id, $body)    : response(400, ['error' => 'ID required']),
        'DELETE' => $id ? deleteUser($conn, $id)           : response(400, ['error' => 'ID required']),
        default  => response(405, ['error' => 'Method not allowed']),
    };
}

response(404, ['error' => 'Route not found']);


// ════════════════════════════════════════════════════════════
// AUTH HANDLERS
// ════════════════════════════════════════════════════════════

function signup(PDO $conn, array $body): void {
    $name     = trim($body['name'] ?? '');
    $email    = trim($body['email'] ?? '');
    $password = $body['password'] ?? '';

    // Validate
    if (!$name || !$email || !$password) {
        response(400, ['error' => 'name, email and password are required']);
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        response(400, ['error' => 'Invalid email format']);
    }
    if (strlen($password) < 6) {
        response(400, ['error' => 'Password must be at least 6 characters']);
    }

    // Check duplicate email
    $stmt = $conn->prepare("SELECT id FROM auth_users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        response(409, ['error' => 'Email already registered']);
    }

    // Hash password (bcrypt)
    $hash = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO auth_users (name, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$name, $email, $hash]);

    response(201, [
        'message' => 'Account created successfully',
        'user'    => ['id' => (int)$conn->lastInsertId(), 'name' => $name, 'email' => $email],
    ]);
}

function login(PDO $conn, array $body): void {
    $email    = trim($body['email'] ?? '');
    $password = $body['password'] ?? '';

    if (!$email || !$password) {
        response(400, ['error' => 'email and password are required']);
    }

    $stmt = $conn->prepare("SELECT * FROM auth_users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Account lockout — too many failed attempts
    if ($user && $user['locked_until'] && new DateTime() < new DateTime($user['locked_until'])) {
        response(429, ['error' => 'Account locked. Try again after ' . $user['locked_until']]);
    }

    if (!$user || !password_verify($password, $user['password'])) {
        // Increment failed attempts
        if ($user) {
            $attempts = $user['failed_attempts'] + 1;
            $lock     = $attempts >= 5 ? date('Y-m-d H:i:s', strtotime('+15 minutes')) : null;
            $conn->prepare("UPDATE auth_users SET failed_attempts=?, locked_until=? WHERE id=?")
                 ->execute([$attempts, $lock, $user['id']]);
        }
        response(401, ['error' => 'Invalid email or password']);
    }

    // Reset failed attempts on success
    $conn->prepare("UPDATE auth_users SET failed_attempts=0, locked_until=NULL WHERE id=?")
         ->execute([$user['id']]);

    // Generate secure token
    $token     = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));

    // Remove old tokens for this user
    $conn->prepare("DELETE FROM auth_tokens WHERE user_id=?")->execute([$user['id']]);

    $conn->prepare("INSERT INTO auth_tokens (user_id, token, expires_at) VALUES (?, ?, ?)")
         ->execute([$user['id'], $token, $expiresAt]);

    response(200, [
        'message'    => 'Login successful',
        'token'      => $token,
        'expires_at' => $expiresAt,
        'user'       => ['id' => $user['id'], 'name' => $user['name'], 'email' => $user['email']],
    ]);
}

function logout(PDO $conn): void {
    $token = getBearerToken();
    if ($token) {
        $conn->prepare("DELETE FROM auth_tokens WHERE token=?")->execute([$token]);
    }
    response(200, ['message' => 'Logged out successfully']);
}

function me(PDO $conn): void {
    $user = requireAuth($conn);
    response(200, ['user' => $user]);
}


// ════════════════════════════════════════════════════════════
// USER HANDLERS (protected)
// ════════════════════════════════════════════════════════════

function getAllUsers(PDO $conn): void {
    $stmt = $conn->query("SELECT id, name, email, age, created_at FROM users ORDER BY id ASC");
    response(200, $stmt->fetchAll());
}

function getUser(PDO $conn, int $id): void {
    $stmt = $conn->prepare("SELECT id, name, email, age, created_at FROM users WHERE id = ?");
    $stmt->execute([$id]);
    $user = $stmt->fetch();
    $user ? response(200, $user) : response(404, ['error' => "User $id not found"]);
}

function createUser(PDO $conn, array $body): void {
    if (empty($body['name']) || empty($body['email'])) {
        response(400, ['error' => 'name and email are required']);
    }
    $stmt = $conn->prepare("INSERT INTO users (name, email, age) VALUES (?, ?, ?)");
    $stmt->execute([$body['name'], $body['email'], $body['age'] ?? null]);
    response(201, ['message' => 'User created', 'id' => (int)$conn->lastInsertId()]);
}

function updateUser(PDO $conn, int $id, array $body): void {
    $stmt = $conn->prepare("SELECT id FROM users WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) response(404, ['error' => "User $id not found"]);

    $conn->prepare("UPDATE users SET name=?, age=? WHERE id=?")
         ->execute([$body['name'] ?? '', $body['age'] ?? null, $id]);
    response(200, ['message' => "User $id updated"]);
}

function deleteUser(PDO $conn, int $id): void {
    $stmt = $conn->prepare("SELECT id FROM users WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) response(404, ['error' => "User $id not found"]);

    $conn->prepare("DELETE FROM users WHERE id=?")->execute([$id]);
    response(200, ['message' => "User $id deleted"]);
}


// ════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════

function requireAuth(PDO $conn): array {
    $token = getBearerToken();
    if (!$token) {
        response(401, ['error' => 'Authorization token required']);
    }

    $stmt = $conn->prepare("
        SELECT auth_users.id, auth_users.name, auth_users.email, auth_tokens.expires_at
        FROM auth_tokens
        JOIN auth_users ON auth_tokens.user_id = auth_users.id
        WHERE auth_tokens.token = ?
    ");
    $stmt->execute([$token]);
    $user = $stmt->fetch();

    if (!$user) {
        response(401, ['error' => 'Invalid or expired token']);
    }
    if (new DateTime() > new DateTime($user['expires_at'])) {
        $conn->prepare("DELETE FROM auth_tokens WHERE token=?")->execute([$token]);
        response(401, ['error' => 'Token expired — please login again']);
    }

    return $user;
}

function getBearerToken(): ?string {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/Bearer\s+(.+)/i', $header, $m)) {
        return $m[1];
    }
    return null;
}

function response(int $status, mixed $data): void {
    http_response_code($status);
    echo json_encode($data, JSON_PRETTY_PRINT);
    exit;
}
