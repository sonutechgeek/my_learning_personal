<?php
class AuthController extends Controller {

    private UserModel $model;
    public function __construct() { $this->model = new UserModel(); }

    // POST /api/auth/signup
    public function signup(): void {
        $body = $this->body();
        $name     = trim($body['name'] ?? '');
        $email    = trim($body['email'] ?? '');
        $password = $body['password'] ?? '';

        if (!$name || !$email || !$password)
            $this->jsonResponse(400, ['error' => 'name, email and password are required']);

        if (!filter_var($email, FILTER_VALIDATE_EMAIL))
            $this->jsonResponse(400, ['error' => 'Invalid email format']);

        if (strlen($password) < 6)
            $this->jsonResponse(400, ['error' => 'Password must be at least 6 characters']);

        if ($this->model->findByEmail($email))
            $this->jsonResponse(409, ['error' => 'Email already registered']);

        $id = $this->model->createAuthUser($name, $email, $password);
        $this->jsonResponse(201, [
            'message' => 'Account created successfully',
            'user'    => ['id' => $id, 'name' => $name, 'email' => $email],
        ]);
    }

    // POST /api/auth/login
    public function login(): void {
        $body     = $this->body();
        $email    = trim($body['email'] ?? '');
        $password = $body['password'] ?? '';

        if (!$email || !$password)
            $this->jsonResponse(400, ['error' => 'email and password are required']);

        $user = $this->model->findByEmail($email);

        if ($user && $user['locked_until'] && new DateTime() < new DateTime($user['locked_until']))
            $this->jsonResponse(429, ['error' => 'Account locked until ' . $user['locked_until']]);

        if (!$user || !password_verify($password, $user['password'])) {
            if ($user) $this->model->incrementFailedAttempts($user['id'], $user['failed_attempts'] + 1);
            $this->jsonResponse(401, ['error' => 'Invalid email or password']);
        }

        $this->model->resetFailedAttempts($user['id']);
        $tokenData = $this->model->createToken($user['id']);

        $this->jsonResponse(200, [
            'message'    => 'Login successful',
            'token'      => $tokenData['token'],
            'expires_at' => $tokenData['expires_at'],
            'user'       => ['id' => $user['id'], 'name' => $user['name'], 'email' => $user['email']],
        ]);
    }

    // POST /api/auth/logout
    public function logout(): void {
        $token = $this->getBearerToken();
        if ($token) $this->model->deleteToken($token);
        $this->jsonResponse(200, ['message' => 'Logged out successfully']);
    }

    // GET /api/auth/me
    public function me(): void {
        $user = $this->requireAuth();
        $this->jsonResponse(200, ['user' => $user]);
    }
}
