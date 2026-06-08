<?php
require 'auth.php';
require 'config.php';
require 'layout.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name   = trim($_POST['name'] ?? '');
    $email  = trim($_POST['email'] ?? '');
    $dept   = trim($_POST['department'] ?? '');
    $salary = $_POST['salary'] ?? 0;
    $joined = $_POST['joined_at'] ?? '';

    if (!$name || !$email) {
        $error = 'Name and Email are required.';
    } else {
        $stmt = getConnection()->prepare(
            "INSERT INTO employees (name, email, department, salary, joined_at) VALUES (?, ?, ?, ?, ?)"
        );
        $stmt->execute([$name, $email, $dept, $salary, $joined ?: null]);
        header('Location: dashboard.php?msg=added');
        exit;
    }
}

pageHeader('Add Employee');
?>

<div class="top-bar">
    <h2>Add New Employee</h2>
    <a href="dashboard.php" class="btn btn-gray">← Back</a>
</div>

<?php if ($error): ?>
    <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
<?php endif; ?>

<div class="card">
    <form method="POST">
        <div class="form-row">
            <div class="form-group">
                <label>Full Name *</label>
                <input type="text" name="name" placeholder="e.g. Sonu Chaudhary" required>
            </div>
            <div class="form-group">
                <label>Email *</label>
                <input type="email" name="email" placeholder="e.g. sonu@company.com" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Department</label>
                <select name="department">
                    <option value="">-- Select --</option>
                    <option>Engineering</option>
                    <option>Marketing</option>
                    <option>HR</option>
                    <option>Finance</option>
                    <option>Operations</option>
                </select>
            </div>
            <div class="form-group">
                <label>Salary (₹)</label>
                <input type="number" name="salary" placeholder="e.g. 60000">
            </div>
        </div>
        <div class="form-group" style="max-width:300px">
            <label>Joining Date</label>
            <input type="date" name="joined_at">
        </div>
        <button type="submit" class="btn btn-primary" style="padding:10px 28px;font-size:14px">Save Employee</button>
    </form>
</div>

<?php pageFooter(); ?>
