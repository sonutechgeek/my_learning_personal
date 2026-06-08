<?php
require 'auth.php';
require 'config.php';

$id = (int)($_GET['id'] ?? 0);
if ($id) {
    $stmt = getConnection()->prepare("DELETE FROM employees WHERE id = ?");
    $stmt->execute([$id]);
}
header('Location: dashboard.php?msg=deleted');
exit;
