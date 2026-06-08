<?php
require 'config.php';

$conn = getConnection();

// ── INNER JOIN — users who have posts ───────────────────────
function getUsersWithPosts(PDO $conn): array {
    $stmt = $conn->query("
        SELECT users.name, users.email, posts.title, posts.created_at
        FROM users
        INNER JOIN posts ON users.id = posts.user_id
        ORDER BY users.id
    ");
    return $stmt->fetchAll();
}

// ── LEFT JOIN — all users even without posts ─────────────────
function getAllUsersWithPosts(PDO $conn): array {
    $stmt = $conn->query("
        SELECT users.name, users.email,
               IFNULL(posts.title, 'No Post') AS post_title
        FROM users
        LEFT JOIN posts ON users.id = posts.user_id
        ORDER BY users.id
    ");
    return $stmt->fetchAll();
}

// ── JOIN with COUNT — how many posts per user ────────────────
function getPostCountPerUser(PDO $conn): array {
    $stmt = $conn->query("
        SELECT users.name, COUNT(posts.id) AS total_posts
        FROM users
        LEFT JOIN posts ON users.id = posts.user_id
        GROUP BY users.id
        ORDER BY total_posts DESC
    ");
    return $stmt->fetchAll();
}


// ── Output ──────────────────────────────────────────────────

echo "=== INNER JOIN (users with posts) ===\n";
foreach (getUsersWithPosts($conn) as $row) {
    echo "{$row['name']} | {$row['title']}\n";
}

echo "\n=== LEFT JOIN (all users + posts) ===\n";
foreach (getAllUsersWithPosts($conn) as $row) {
    echo "{$row['name']} | {$row['post_title']}\n";
}

echo "\n=== Post Count Per User ===\n";
foreach (getPostCountPerUser($conn) as $row) {
    echo "{$row['name']}: {$row['total_posts']} post(s)\n";
}
