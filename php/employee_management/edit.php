<?php
require 'auth.php';
require 'config.php';
require 'layout.php';

$conn = getConnection();
$id   = (int)($_GET['id'] ?? 0);

$stmt = $conn->prepare("SELECT * FROM employees WHERE id = ?");
$stmt->execute([$id]);
$emp = $stmt->fetch();

if (!$emp) {
    header('Location: dashboard.php');
    exit;
}

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
        $stmt = $conn->prepare(
            "UPDATE employees SET name=?, email=?, department=?, salary=?, joined_at=? WHERE id=?"
        );
        $stmt->execute([$name, $email, $dept, $salary, $joined ?: null, $id]);
        header('Location: dashboard.php?msg=updated');
        exit;
    }
}

pageHeader('Edit Employee');
?>

<div class="top-bar">
    <h2>Edit Employee — <?= htmlspecialchars($emp['name']) ?></h2>
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
                <input type="text" name="name" value="<?= htmlspecialchars($emp['name']) ?>" required>
            </div>
            <div class="form-group">
                <label>Email *</label>
                <input type="email" name="email" value="<?= htmlspecialchars($emp['email']) ?>" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Department</label>
                <select name="department">
                    <option value="">-- Select --</option>
                    <?php foreach (['Engineering','Marketing','HR','Finance','Operations'] as $d): ?>
                        <option <?= $emp['department'] === $d ? 'selected' : '' ?>><?= $d ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="form-group">
                <label>Salary (₹)</label>
                <input type="number" name="salary" value="<?= $emp['salary'] ?>">
            </div>
        </div>
        <div class="form-group" style="max-width:300px">
            <label>Joining Date</label>
            <input type="date" name="joined_at" value="<?= $emp['joined_at'] ?>">
        </div>
        <button type="submit" class="btn btn-primary" style="padding:10px 28px;font-size:14px">Update Employee</button>
    </form>
</div>

<?php pageFooter(); ?>
