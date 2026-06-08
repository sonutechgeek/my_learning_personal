<?php
require 'config.php';

$conn = getConnection();

// ── Search by name (SQL Injection SAFE using prepared statement) ──
function searchByName(PDO $conn, string $keyword): array {
    $stmt = $conn->prepare("SELECT * FROM users WHERE name LIKE ?");
    $stmt->execute(['%' . $keyword . '%']);   // % wildcard added in PHP, not SQL
    return $stmt->fetchAll();
}

// ── Search by age range ──────────────────────────────────────
function searchByAgeRange(PDO $conn, int $min, int $max): array {
    $stmt = $conn->prepare("SELECT * FROM users WHERE age BETWEEN ? AND ? ORDER BY age");
    $stmt->execute([$min, $max]);
    return $stmt->fetchAll();
}

// ── Search posts by keyword in title or body ─────────────────
function searchPosts(PDO $conn, string $keyword): array {
    $stmt = $conn->prepare("
        SELECT posts.title, posts.body, users.name AS author
        FROM posts
        INNER JOIN users ON posts.user_id = users.id
        WHERE posts.title LIKE ? OR posts.body LIKE ?
    ");
    $like = '%' . $keyword . '%';
    $stmt->execute([$like, $like]);
    return $stmt->fetchAll();
}


// ── Output ──────────────────────────────────────────────────

echo "=== Search users by name 'a' ===\n";
foreach (searchByName($conn, 'a') as $u) {
    echo "  {$u['name']} | {$u['email']}\n";
}

echo "\n=== Search users age 25-30 ===\n";
foreach (searchByAgeRange($conn, 25, 30) as $u) {
    echo "  {$u['name']} | Age: {$u['age']}\n";
}

echo "\n=== Search posts with keyword 'php' ===\n";
foreach (searchPosts($conn, 'php') as $p) {
    echo "  [{$p['author']}] {$p['title']}\n";
}

echo "\n=== SQL Injection Prevention Demo ===\n";
// Dangerous input — but safe because of prepared statement
$malicious = "' OR '1'='1";
$result = searchByName($conn, $malicious);
echo "Malicious input returned " . count($result) . " rows (expected 0) ✓\n";
