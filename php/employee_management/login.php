<?php
session_start();
if (isset($_SESSION['admin'])) {
    header('Location: dashboard.php');
    exit;
}
require 'config.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = getConnection()->prepare("SELECT * FROM admin_users WHERE username = ?");
    $stmt->execute([$username]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($password, $admin['password'])) {
        $_SESSION['admin'] = $admin['username'];
        header('Location: dashboard.php');
        exit;
    }
    $error = 'Invalid username or password.';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login | EMS</title>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: Arial, sans-serif; background: #f0f2f5;
            display: flex; align-items: center; justify-content: center; min-height: 100vh;
        }
        .login-box {
            background: #fff; padding: 40px; border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,.1); width: 360px;
        }
        h2 { text-align: center; color: #1e293b; margin-bottom: 8px; }
        p  { text-align: center; color: #94a3b8; font-size: 13px; margin-bottom: 28px; }
        label { display: block; font-size: 13px; font-weight: bold; color: #475569; margin-bottom: 6px; }
        input {
            width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0;
            border-radius: 6px; font-size: 14px; margin-bottom: 16px;
        }
        input:focus { outline: 2px solid #4f46e5; border-color: transparent; }
        button {
            width: 100%; padding: 11px; background: #4f46e5; color: #fff;
            border: none; border-radius: 6px; font-size: 15px; font-weight: bold; cursor: pointer;
        }
        button:hover { background: #4338ca; }
        .error { background: #fee2e2; color: #dc2626; padding: 10px 14px; border-radius: 6px; margin-bottom: 18px; font-size: 13px; }
        .hint { text-align:center; color:#94a3b8; font-size:12px; margin-top:16px; }
    </style>
</head>
<body>
<div class="login-box">
    <h2>EMS Login</h2>
    <p>Employee Management System</p>
    <?php if ($error): ?>
        <div class="error"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <form method="POST">
        <label>Username</label>
        <input type="text" name="username" placeholder="admin" required>
        <label>Password</label>
        <input type="password" name="password" placeholder="••••••••" required>
        <button type="submit">Login</button>
    </form>
    <p class="hint">Default: admin / password</p>
</div>
</body>
</html>
