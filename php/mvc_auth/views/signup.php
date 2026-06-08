<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Sign Up</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);min-height:100vh;display:flex;align-items:center;justify-content:center}
.card{background:#fff;border-radius:16px;padding:40px 36px;width:420px;box-shadow:0 20px 60px rgba(0,0,0,.2)}
.logo{text-align:center;margin-bottom:28px}
.logo h2{font-size:24px;color:#1e293b}
.logo p{color:#94a3b8;font-size:13px;margin-top:4px}
label{display:block;font-size:13px;font-weight:bold;color:#475569;margin-bottom:5px}
.input-wrap{margin-bottom:14px}
input{width:100%;padding:11px 14px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;transition:.2s}
input:focus{outline:none;border-color:#667eea;box-shadow:0 0 0 3px rgba(102,126,234,.15)}
input.error-input{border-color:#ef4444}
.field-error{font-size:12px;color:#ef4444;margin-top:4px;display:none}
.btn{width:100%;padding:12px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:bold;cursor:pointer;margin-top:6px;transition:.2s}
.btn:hover{opacity:.9}
.btn:disabled{opacity:.6;cursor:not-allowed}
.alert{padding:11px 14px;border-radius:8px;font-size:13px;margin-bottom:16px;display:none}
.alert.error{background:#fee2e2;color:#dc2626;display:block}
.alert.success{background:#dcfce7;color:#16a34a;display:block}
.footer{text-align:center;margin-top:20px;font-size:13px;color:#64748b}
.footer a{color:#667eea;text-decoration:none;font-weight:bold}
.strength{height:4px;border-radius:2px;margin-top:6px;transition:.3s}
.spinner{display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;margin-right:8px;vertical-align:middle}
@keyframes spin{to{transform:rotate(360deg)}}
</style>
</head>
<body>
<div class="card">
  <div class="logo">
    <h2>Create Account</h2>
    <p>Fill in the details to get started</p>
  </div>
  <div class="alert" id="alert"></div>
  <form id="signupForm" novalidate>
    <label>Full Name</label>
    <div class="input-wrap">
      <input type="text" id="name" placeholder="Sonu Chaudhary" required>
      <div class="field-error" id="nameErr">Name is required</div>
    </div>
    <label>Email Address</label>
    <div class="input-wrap">
      <input type="email" id="email" placeholder="sonu@example.com" required>
      <div class="field-error" id="emailErr">Valid email is required</div>
    </div>
    <label>Password</label>
    <div class="input-wrap">
      <input type="password" id="password" placeholder="Min 6 characters" required oninput="checkStrength(this.value)">
      <div class="strength" id="strength"></div>
      <div class="field-error" id="passErr">Password must be at least 6 characters</div>
    </div>
    <label>Confirm Password</label>
    <div class="input-wrap">
      <input type="password" id="confirm" placeholder="Re-enter password" required>
      <div class="field-error" id="confirmErr">Passwords do not match</div>
    </div>
    <button type="submit" class="btn" id="btn">Create Account</button>
  </form>
  <div class="footer">Already have an account? <a href="/login">Login</a></div>
</div>

<script>
function checkStrength(val) {
  const bar = document.getElementById('strength');
  if (!val) { bar.style.background=''; bar.style.width='0'; return; }
  let score = 0;
  if (val.length >= 6)  score++;
  if (val.length >= 10) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^a-zA-Z0-9]/.test(val)) score++;
  const colors = ['','#ef4444','#f59e0b','#f59e0b','#22c55e','#16a34a'];
  bar.style.background = colors[score];
  bar.style.width = (score * 20) + '%';
}

function showErr(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.display = 'block';
  document.getElementById(id.replace('Err','')) && (document.getElementById(id.replace('Err',''))?.classList.add('error-input'));
}
function clearErrs() {
  document.querySelectorAll('.field-error').forEach(e => e.style.display='none');
  document.querySelectorAll('input').forEach(e => e.classList.remove('error-input'));
}

document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrs();

  const name     = document.getElementById('name').value.trim();
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirm  = document.getElementById('confirm').value;
  const btn      = document.getElementById('btn');
  const alertEl  = document.getElementById('alert');
  let valid      = true;

  if (!name)    { showErr('nameErr', 'Name is required'); valid = false; }
  if (!email || !/\S+@\S+\.\S+/.test(email)) { showErr('emailErr', 'Valid email is required'); valid = false; }
  if (password.length < 6) { showErr('passErr', 'Password must be at least 6 characters'); valid = false; }
  if (password !== confirm) { showErr('confirmErr', 'Passwords do not match'); valid = false; }
  if (!valid) return;

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>Creating account...';
  alertEl.className = 'alert';

  try {
    const res  = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Signup failed');

    alertEl.className = 'alert success';
    alertEl.textContent = 'Account created! Redirecting to login...';
    setTimeout(() => window.location.href = '/login', 1200);

  } catch (err) {
    alertEl.className = 'alert error';
    alertEl.textContent = err.message;
    btn.disabled = false;
    btn.textContent = 'Create Account';
  }
});
</script>
</body>
</html>
