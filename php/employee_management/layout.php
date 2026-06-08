<?php
function pageHeader(string $title): void { ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= $title ?> | EMS</title>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body   { font-family: Arial, sans-serif; background: #f0f2f5; min-height: 100vh; }

        nav {
            background: #1e293b; color: #fff; padding: 0 30px;
            display: flex; align-items: center; justify-content: space-between; height: 56px;
        }
        nav .brand { font-size: 18px; font-weight: bold; letter-spacing: 1px; }
        nav a { color: #94a3b8; text-decoration: none; margin-left: 20px; font-size: 14px; }
        nav a:hover { color: #fff; }
        nav .logout { color: #f87171; }

        .container { max-width: 960px; margin: 30px auto; padding: 0 20px; }

        h2 { font-size: 22px; color: #1e293b; margin-bottom: 20px; }

        .card {
            background: #fff; border-radius: 10px; padding: 28px;
            box-shadow: 0 1px 6px rgba(0,0,0,.08);
        }

        table { width: 100%; border-collapse: collapse; }
        th { background: #1e293b; color: #fff; padding: 12px 14px; text-align: left; font-size: 13px; }
        td { padding: 11px 14px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #f8fafc; }

        .badge {
            display: inline-block; padding: 3px 10px; border-radius: 20px;
            font-size: 12px; font-weight: bold;
        }
        .badge-eng  { background: #dbeafe; color: #1d4ed8; }
        .badge-hr   { background: #fce7f3; color: #be185d; }
        .badge-mkt  { background: #dcfce7; color: #15803d; }
        .badge-fin  { background: #fef9c3; color: #a16207; }
        .badge-other{ background: #f1f5f9; color: #475569; }

        .btn {
            display: inline-block; padding: 8px 16px; border-radius: 6px;
            font-size: 13px; font-weight: bold; text-decoration: none;
            cursor: pointer; border: none;
        }
        .btn-primary { background: #4f46e5; color: #fff; }
        .btn-primary:hover { background: #4338ca; }
        .btn-edit    { background: #0ea5e9; color: #fff; }
        .btn-edit:hover { background: #0284c7; }
        .btn-delete  { background: #ef4444; color: #fff; }
        .btn-delete:hover { background: #dc2626; }
        .btn-gray    { background: #e2e8f0; color: #475569; }
        .btn-gray:hover { background: #cbd5e1; }

        .form-group { margin-bottom: 18px; }
        label { display: block; font-size: 13px; font-weight: bold; color: #475569; margin-bottom: 6px; }
        input, select {
            width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0;
            border-radius: 6px; font-size: 14px; color: #1e293b;
        }
        input:focus, select:focus { outline: 2px solid #4f46e5; border-color: transparent; }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        .alert { padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; font-size: 14px; }
        .alert-success { background: #dcfce7; color: #15803d; }
        .alert-error   { background: #fee2e2; color: #dc2626; }

        .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    </style>
</head>
<body>
<nav>
    <div class="brand">EMS — Employee Management</div>
    <div>
        <a href="dashboard.php">Dashboard</a>
        <a href="add.php">+ Add Employee</a>
        <a href="logout.php" class="logout">Logout</a>
    </div>
</nav>
<div class="container">
<?php } ?>

<?php
function pageFooter(): void { ?>
</div></body></html>
<?php }
