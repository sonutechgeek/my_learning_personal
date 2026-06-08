<?php
require 'config.php';

$conn = getConnection();

function getPaginatedUsers(PDO $conn, int $page = 1, int $perPage = 3): array {
    $offset = ($page - 1) * $perPage;
    $stmt = $conn->prepare("SELECT * FROM users ORDER BY id ASC LIMIT ? OFFSET ?");
    $stmt->bindValue(1, $perPage, PDO::PARAM_INT);
    $stmt->bindValue(2, $offset,  PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll();
}

function getTotalUsers(PDO $conn): int {
    return (int) $conn->query("SELECT COUNT(*) FROM users")->fetchColumn();
}

$perPage    = 3;
$totalUsers = getTotalUsers($conn);
$totalPages = ceil($totalUsers / $perPage);
$currentPage = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$currentPage = max(1, min($currentPage, $totalPages));
$users = getPaginatedUsers($conn, $currentPage, $perPage);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pagination</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 700px; margin: 40px auto; background: #f4f6f8; }
        h2   { color: #333; }

        .info { background: #fff; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px;
                box-shadow: 0 1px 4px rgba(0,0,0,.1); font-size: 14px; color: #555; }

        table { width: 100%; border-collapse: collapse; background: #fff;
                border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,.1); }
        th    { background: #4f46e5; color: #fff; padding: 12px 16px; text-align: left; }
        td    { padding: 11px 16px; border-bottom: 1px solid #eee; color: #333; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #f0f4ff; }

        .pagination { display: flex; gap: 8px; margin-top: 20px; justify-content: center; }
        .pagination a, .pagination span {
            padding: 8px 14px; border-radius: 6px; text-decoration: none;
            font-size: 14px; font-weight: bold;
        }
        .pagination a    { background: #fff; color: #4f46e5; border: 1px solid #4f46e5; }
        .pagination a:hover { background: #4f46e5; color: #fff; }
        .pagination .active { background: #4f46e5; color: #fff; border: 1px solid #4f46e5; }
        .pagination .disabled { background: #eee; color: #aaa; border: 1px solid #eee; }
    </style>
</head>
<body>

<h2>Users List</h2>

<div class="info">
    Total Users: <strong><?= $totalUsers ?></strong> &nbsp;|&nbsp;
    Per Page: <strong><?= $perPage ?></strong> &nbsp;|&nbsp;
    Total Pages: <strong><?= $totalPages ?></strong> &nbsp;|&nbsp;
    Current Page: <strong><?= $currentPage ?></strong>
</div>

<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($users as $u): ?>
        <tr>
            <td><?= $u['id'] ?></td>
            <td><?= htmlspecialchars($u['name']) ?></td>
            <td><?= htmlspecialchars($u['email']) ?></td>
            <td><?= $u['age'] ?></td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<div class="pagination">
    <?php if ($currentPage > 1): ?>
        <a href="?page=<?= $currentPage - 1 ?>">« Prev</a>
    <?php else: ?>
        <span class="disabled">« Prev</span>
    <?php endif; ?>

    <?php for ($i = 1; $i <= $totalPages; $i++): ?>
        <?php if ($i === $currentPage): ?>
            <span class="active"><?= $i ?></span>
        <?php else: ?>
            <a href="?page=<?= $i ?>"><?= $i ?></a>
        <?php endif; ?>
    <?php endfor; ?>

    <?php if ($currentPage < $totalPages): ?>
        <a href="?page=<?= $currentPage + 1 ?>">Next »</a>
    <?php else: ?>
        <span class="disabled">Next »</span>
    <?php endif; ?>
</div>

</body>
</html>
