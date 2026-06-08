<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Dashboard</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;background:#f0f2f5;min-height:100vh}

nav{background:#1e293b;height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 28px}
.nav-brand{color:#fff;font-size:18px;font-weight:bold}
.nav-user{display:flex;align-items:center;gap:14px}
.nav-user span{color:#94a3b8;font-size:14px}
.nav-user strong{color:#fff}
.btn-logout{background:#ef4444;color:#fff;border:none;padding:7px 16px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:bold}
.btn-logout:hover{background:#dc2626}

.container{max-width:1000px;margin:30px auto;padding:0 20px}

.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:28px}
.stat-card{background:#fff;border-radius:10px;padding:20px;box-shadow:0 1px 4px rgba(0,0,0,.08)}
.stat-card .num{font-size:32px;font-weight:bold;color:#4f46e5}
.stat-card .label{font-size:13px;color:#94a3b8;margin-top:4px}

.card{background:#fff;border-radius:10px;box-shadow:0 1px 4px rgba(0,0,0,.08);overflow:hidden}
.card-header{padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #f1f5f9}
.card-header h3{font-size:16px;color:#1e293b}
.btn-add{background:#4f46e5;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:bold}
.btn-add:hover{background:#4338ca}

table{width:100%;border-collapse:collapse}
th{background:#f8fafc;padding:11px 16px;text-align:left;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid #e2e8f0}
td{padding:12px 16px;font-size:14px;color:#334155;border-bottom:1px solid #f1f5f9}
tr:last-child td{border:none}
tr:hover td{background:#f8fafc}

.btn-edit{background:#0ea5e9;color:#fff;border:none;padding:5px 12px;border-radius:5px;cursor:pointer;font-size:12px;margin-right:4px}
.btn-del{background:#ef4444;color:#fff;border:none;padding:5px 12px;border-radius:5px;cursor:pointer;font-size:12px}

.modal-bg{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:100;align-items:center;justify-content:center}
.modal-bg.open{display:flex}
.modal{background:#fff;border-radius:12px;padding:28px;width:400px}
.modal h3{margin-bottom:20px;color:#1e293b}
.form-group{margin-bottom:14px}
.form-group label{display:block;font-size:13px;font-weight:bold;color:#475569;margin-bottom:5px}
.form-group input,.form-group select{width:100%;padding:9px 12px;border:1.5px solid #e2e8f0;border-radius:7px;font-size:14px}
.form-group input:focus{outline:none;border-color:#4f46e5}
.modal-btns{display:flex;gap:10px;margin-top:18px}
.btn-save{flex:1;padding:10px;background:#4f46e5;color:#fff;border:none;border-radius:7px;font-weight:bold;cursor:pointer}
.btn-cancel{flex:1;padding:10px;background:#e2e8f0;color:#475569;border:none;border-radius:7px;font-weight:bold;cursor:pointer}

.toast{position:fixed;bottom:24px;right:24px;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:bold;color:#fff;display:none;z-index:200}
.toast.show{display:block}
.toast.success{background:#16a34a}
.toast.error{background:#dc2626}
.loading{text-align:center;padding:30px;color:#94a3b8}
</style>
</head>
<body>

<nav>
  <div class="nav-brand">MVC Dashboard</div>
  <div class="nav-user">
    <span>Welcome, <strong id="userName">...</strong></span>
    <button class="btn-logout" onclick="logout()">Logout</button>
  </div>
</nav>

<div class="container">

  <div class="stats">
    <div class="stat-card">
      <div class="num" id="totalUsers">-</div>
      <div class="label">Total Users</div>
    </div>
    <div class="stat-card">
      <div class="num" id="loggedUser">-</div>
      <div class="label">Logged In As</div>
    </div>
    <div class="stat-card">
      <div class="num" id="tokenExpiry">-</div>
      <div class="label">Session Expires</div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <h3>Users List</h3>
      <button class="btn-add" onclick="openModal()">+ Add User</button>
    </div>
    <div id="tableWrap"><div class="loading">Loading...</div></div>
  </div>
</div>

<!-- Add / Edit Modal -->
<div class="modal-bg" id="modalBg">
  <div class="modal">
    <h3 id="modalTitle">Add User</h3>
    <div class="form-group"><label>Name</label><input type="text" id="mName" placeholder="Full name"></div>
    <div class="form-group"><label>Email</label><input type="email" id="mEmail" placeholder="email@example.com"></div>
    <div class="form-group"><label>Age</label><input type="number" id="mAge" placeholder="Age"></div>
    <div class="modal-btns">
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      <button class="btn-save" onclick="saveUser()">Save</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
const API   = '';
let token   = localStorage.getItem('token');
let editId  = null;

// Redirect if no token
if (!token) window.location.href = '/login';

// ── Init ────────────────────────────────────────────────────
async function init() {
  try {
    const res  = await authFetch('/api/auth/me');
    const data = await res.json();
    if (!res.ok) { logout(); return; }

    document.getElementById('userName').textContent  = data.user.name;
    document.getElementById('loggedUser').textContent = data.user.name;
    document.getElementById('tokenExpiry').textContent = data.user.expires_at?.split(' ')[0] ?? 'Today';

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    loadUsers();
  } catch { logout(); }
}

// ── Load Users ──────────────────────────────────────────────
async function loadUsers() {
  const res   = await authFetch('/api/users');
  const users = await res.json();
  document.getElementById('totalUsers').textContent = users.length;

  if (!users.length) {
    document.getElementById('tableWrap').innerHTML = '<div class="loading">No users found.</div>';
    return;
  }

  document.getElementById('tableWrap').innerHTML = `
    <table>
      <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Age</th><th>Actions</th></tr></thead>
      <tbody>${users.map((u, i) => `
        <tr>
          <td>${i+1}</td>
          <td><strong>${u.name}</strong></td>
          <td>${u.email}</td>
          <td>${u.age ?? '—'}</td>
          <td>
            <button class="btn-edit" onclick="openModal(${u.id},'${u.name}','${u.email}',${u.age??''})">Edit</button>
            <button class="btn-del"  onclick="deleteUser(${u.id},'${u.name}')">Delete</button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>`;
}

// ── Modal ───────────────────────────────────────────────────
function openModal(id, name, email, age) {
  editId = id || null;
  document.getElementById('modalTitle').textContent = id ? 'Edit User' : 'Add User';
  document.getElementById('mName').value  = name  || '';
  document.getElementById('mEmail').value = email || '';
  document.getElementById('mAge').value   = age   || '';
  document.getElementById('mEmail').disabled = !!id;
  document.getElementById('modalBg').classList.add('open');
}
function closeModal() {
  document.getElementById('modalBg').classList.remove('open');
  editId = null;
}

// ── Save (Add / Edit) ───────────────────────────────────────
async function saveUser() {
  const name  = document.getElementById('mName').value.trim();
  const email = document.getElementById('mEmail').value.trim();
  const age   = document.getElementById('mAge').value;
  if (!name || !email) { showToast('Name and Email required', 'error'); return; }

  const url    = editId ? `/api/users/${editId}` : '/api/users';
  const method = editId ? 'PUT' : 'POST';
  const res    = await authFetch(url, method, { name, email, age: age ? parseInt(age) : null });
  const data   = await res.json();

  if (!res.ok) { showToast(data.error, 'error'); return; }

  showToast(data.message, 'success');
  closeModal();
  loadUsers();
}

// ── Delete ──────────────────────────────────────────────────
async function deleteUser(id, name) {
  if (!confirm(`Delete user "${name}"?`)) return;
  const res  = await authFetch(`/api/users/${id}`, 'DELETE');
  const data = await res.json();
  res.ok ? showToast(data.message, 'success') : showToast(data.error, 'error');
  loadUsers();
}

// ── Logout ──────────────────────────────────────────────────
async function logout() {
  await authFetch('/api/auth/logout', 'POST').catch(() => {});
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
}

// ── Helpers ─────────────────────────────────────────────────
function authFetch(url, method = 'GET', body = null) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
  };
  if (body) opts.body = JSON.stringify(body);
  return fetch(API + url, opts);
}

function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className   = `toast ${type} show`;
  setTimeout(() => t.className = 'toast', 3000);
}

// Close modal on background click
document.getElementById('modalBg').addEventListener('click', e => {
  if (e.target === document.getElementById('modalBg')) closeModal();
});

init();
</script>
</body>
</html>
