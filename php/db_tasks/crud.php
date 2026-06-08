<?php
require 'config.php';

$conn = getConnection();

// ── CREATE ──────────────────────────────────────────────────
function createUser(PDO $conn, string $name, string $email, int $age): int {
    $stmt = $conn->prepare("INSERT INTO users (name, email, age) VALUES (?, ?, ?)");
    $stmt->execute([$name, $email, $age]);
    return (int) $conn->lastInsertId();
}

// ── READ (all) ───────────────────────────────────────────────
function getAllUsers(PDO $conn): array {
    $stmt = $conn->query("SELECT * FROM users ORDER BY id ASC");
    return $stmt->fetchAll();
}

// ── READ (single by ID) ──────────────────────────────────────
function getUserById(PDO $conn, int $id): array|false {
    $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch();
}

// ── UPDATE ──────────────────────────────────────────────────
function updateUser(PDO $conn, int $id, string $name, int $age): bool {
    $stmt = $conn->prepare("UPDATE users SET name = ?, age = ? WHERE id = ?");
    return $stmt->execute([$name, $age, $id]);
}

// ── DELETE ──────────────────────────────────────────────────
function deleteUser(PDO $conn, int $id): bool {
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    return $stmt->execute([$id]);
}

// ── Run Demo ────────────────────────────────────────────────
$newId  = createUser($conn, "TestUser", "test_demo@example.com", 22);
$users  = getAllUsers($conn);
$single = getUserById($conn, 1);
updateUser($conn, $newId, "UpdatedUser", 25);
$updated = getUserById($conn, $newId);
deleteUser($conn, $newId);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CRUD Demo</title>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; background: #f0f2f5; padding: 30px; }
        h1   { color: #1e293b; margin-bottom: 24px; font-size: 22px; }
        h2   { font-size: 15px; font-weight: bold; color: #fff; margin-bottom: 0; }

        .section { background: #fff; border-radius: 10px; margin-bottom: 24px;
                   box-shadow: 0 1px 6px rgba(0,0,0,.08); overflow: hidden; }

        .section-header {
            padding: 12px 20px; display: flex; align-items: center; gap: 10px;
        }
        .section-body { padding: 20px; }

        .create-header  { background: #10b981; }
        .read-header    { background: #4f46e5; }
        .single-header  { background: #0ea5e9; }
        .update-header  { background: #f59e0b; }
        .delete-header  { background: #ef4444; }

        .tag {
            background: rgba(255,255,255,.25); color: #fff;
            padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: bold;
        }

        .result-box {
            background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;
            padding: 12px 16px; font-size: 14px; color: #334155;
        }

        table { width: 100%; border-collapse: collapse; }
        th { background: #1e293b; color: #fff; padding: 10px 14px; text-align: left; font-size: 13px; }
        td { padding: 10px 14px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #f8fafc; }

        .kv { display: flex; gap: 12px; flex-wrap: wrap; }
        .kv span { background: #f1f5f9; padding: 6px 14px; border-radius: 6px; font-size: 13px; }
        .kv strong { color: #4f46e5; }
    </style>
</head>
<body>

<h1>CRUD Operations — Demo</h1>

<!-- CREATE -->
<div class="section">
    <div class="section-header create-header">
        <h2>CREATE</h2>
        <span class="tag">INSERT INTO users</span>
    </div>
    <div class="section-body">
        <div class="result-box">
            New user created with ID: <strong><?= $newId ?></strong>
            (deleted after demo — see DELETE section)
        </div>
    </div>
</div>

<!-- READ ALL -->
<div class="section">
    <div class="section-header read-header">
        <h2>READ ALL</h2>
        <span class="tag">SELECT * FROM users</span>
    </div>
    <div class="section-body">
        <table>
            <thead>
                <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Created At</th></tr>
            </thead>
            <tbody>
                <?php foreach ($users as $u): ?>
                <tr>
                    <td><?= $u['id'] ?></td>
                    <td><?= htmlspecialchars($u['name']) ?></td>
                    <td><?= htmlspecialchars($u['email']) ?></td>
                    <td><?= $u['age'] ?></td>
                    <td><?= $u['created_at'] ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- READ SINGLE -->
<div class="section">
    <div class="section-header single-header">
        <h2>READ SINGLE</h2>
        <span class="tag">WHERE id = 1</span>
    </div>
    <div class="section-body">
        <div class="kv">
            <span>ID: <strong><?= $single['id'] ?></strong></span>
            <span>Name: <strong><?= htmlspecialchars($single['name']) ?></strong></span>
            <span>Email: <strong><?= htmlspecialchars($single['email']) ?></strong></span>
            <span>Age: <strong><?= $single['age'] ?></strong></span>
        </div>
    </div>
</div>

<!-- UPDATE -->
<div class="section">
    <div class="section-header update-header">
        <h2>UPDATE</h2>
        <span class="tag">UPDATE users SET name=?, age=? WHERE id=?</span>
    </div>
    <div class="section-body">
        <div class="result-box">
            User ID <strong><?= $newId ?></strong> updated →
            Name: <strong><?= htmlspecialchars($updated['name']) ?></strong>,
            Age: <strong><?= $updated['age'] ?></strong>
        </div>
    </div>
</div>

<!-- DELETE -->
<div class="section">
    <div class="section-header delete-header">
        <h2>DELETE</h2>
        <span class="tag">DELETE FROM users WHERE id=?</span>
    </div>
    <div class="section-body">
        <div class="result-box">
            User ID <strong><?= $newId ?></strong> deleted successfully.
        </div>
    </div>
</div>

</body>
</html>
