<?php
require 'auth.php';
require 'config.php';
require 'layout.php';

$conn = getConnection();
$employees = $conn->query("SELECT * FROM employees ORDER BY id DESC")->fetchAll();

$deptBadge = [
    'Engineering' => 'badge-eng',
    'HR'          => 'badge-hr',
    'Marketing'   => 'badge-mkt',
    'Finance'     => 'badge-fin',
];

$msg = $_GET['msg'] ?? '';
pageHeader('Dashboard');
?>

<div class="top-bar">
    <h2>All Employees (<?= count($employees) ?>)</h2>
    <a href="add.php" class="btn btn-primary">+ Add Employee</a>
</div>

<?php if ($msg === 'added'):   ?><div class="alert alert-success">Employee added successfully.</div><?php endif; ?>
<?php if ($msg === 'updated'): ?><div class="alert alert-success">Employee updated successfully.</div><?php endif; ?>
<?php if ($msg === 'deleted'): ?><div class="alert alert-success">Employee deleted successfully.</div><?php endif; ?>

<div class="card">
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Joined</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($employees as $i => $emp): ?>
            <tr>
                <td><?= $i + 1 ?></td>
                <td><strong><?= htmlspecialchars($emp['name']) ?></strong></td>
                <td><?= htmlspecialchars($emp['email']) ?></td>
                <td>
                    <span class="badge <?= $deptBadge[$emp['department']] ?? 'badge-other' ?>">
                        <?= htmlspecialchars($emp['department']) ?>
                    </span>
                </td>
                <td>₹<?= number_format($emp['salary']) ?></td>
                <td><?= $emp['joined_at'] ?></td>
                <td>
                    <a href="edit.php?id=<?= $emp['id'] ?>" class="btn btn-edit">Edit</a>
                    <a href="delete.php?id=<?= $emp['id'] ?>"
                       class="btn btn-delete"
                       onclick="return confirm('Delete <?= htmlspecialchars($emp['name']) ?>?')">Delete</a>
                </td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
</div>

<?php pageFooter(); ?>
