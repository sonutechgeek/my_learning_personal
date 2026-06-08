<?php
class Controller {

    protected function jsonResponse(int $status, mixed $data): void {
        header('Content-Type: application/json');
        http_response_code($status);
        echo json_encode($data, JSON_PRETTY_PRINT);
        exit;
    }

    protected function view(string $view, array $data = []): void {
        extract($data);
        require __DIR__ . '/../views/' . $view . '.php';
        exit;
    }

    protected function getBearerToken(): ?string {
        $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
        return preg_match('/Bearer\s+(.+)/i', $header, $m) ? $m[1] : null;
    }

    protected function requireAuth(): array {
        $token = $this->getBearerToken();
        if (!$token) $this->jsonResponse(401, ['error' => 'Token required']);

        $user = (new UserModel())->findByToken($token);
        if (!$user)  $this->jsonResponse(401, ['error' => 'Invalid or expired token']);

        return $user;
    }

    protected function body(): array {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }
}
