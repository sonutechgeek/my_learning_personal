<?php
class UserModel extends Model {

    // ── Auth ────────────────────────────────────────────────

    public function findByEmail(string $email): array|false {
        $stmt = $this->db->prepare("SELECT * FROM auth_users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch();
    }

    public function createAuthUser(string $name, string $email, string $password): int {
        $stmt = $this->db->prepare(
            "INSERT INTO auth_users (name, email, password) VALUES (?, ?, ?)"
        );
        $stmt->execute([$name, $email, password_hash($password, PASSWORD_BCRYPT)]);
        return (int) $this->db->lastInsertId();
    }

    public function incrementFailedAttempts(int $id, int $attempts): void {
        $lock = $attempts >= 5 ? date('Y-m-d H:i:s', strtotime('+15 minutes')) : null;
        $this->db->prepare("UPDATE auth_users SET failed_attempts=?, locked_until=? WHERE id=?")
                 ->execute([$attempts, $lock, $id]);
    }

    public function resetFailedAttempts(int $id): void {
        $this->db->prepare("UPDATE auth_users SET failed_attempts=0, locked_until=NULL WHERE id=?")
                 ->execute([$id]);
    }

    public function createToken(int $userId): array {
        $token     = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));
        $this->db->prepare("DELETE FROM auth_tokens WHERE user_id=?")->execute([$userId]);
        $this->db->prepare("INSERT INTO auth_tokens (user_id, token, expires_at) VALUES (?,?,?)")
                 ->execute([$userId, $token, $expiresAt]);
        return ['token' => $token, 'expires_at' => $expiresAt];
    }

    public function findByToken(string $token): array|false {
        $stmt = $this->db->prepare("
            SELECT auth_users.id, auth_users.name, auth_users.email, auth_tokens.expires_at
            FROM auth_tokens
            JOIN auth_users ON auth_tokens.user_id = auth_users.id
            WHERE auth_tokens.token = ? AND auth_tokens.expires_at > NOW()
        ");
        $stmt->execute([$token]);
        return $stmt->fetch();
    }

    public function deleteToken(string $token): void {
        $this->db->prepare("DELETE FROM auth_tokens WHERE token=?")->execute([$token]);
    }

    // ── Users CRUD ──────────────────────────────────────────

    public function all(): array {
        return $this->db->query("SELECT id, name, email, age, created_at FROM users ORDER BY id")
                        ->fetchAll();
    }

    public function find(int $id): array|false {
        $stmt = $this->db->prepare("SELECT id, name, email, age, created_at FROM users WHERE id=?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function create(array $data): int {
        $this->db->prepare("INSERT INTO users (name, email, age) VALUES (?,?,?)")
                 ->execute([$data['name'], $data['email'], $data['age'] ?? null]);
        return (int) $this->db->lastInsertId();
    }

    public function update(int $id, array $data): void {
        $this->db->prepare("UPDATE users SET name=?, age=? WHERE id=?")
                 ->execute([$data['name'], $data['age'] ?? null, $id]);
    }

    public function delete(int $id): void {
        $this->db->prepare("DELETE FROM users WHERE id=?")->execute([$id]);
    }
}
