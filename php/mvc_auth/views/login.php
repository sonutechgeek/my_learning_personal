<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Login</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);min-height:100vh;display:flex;align-items:center;justify-content:center}
.card{background:#fff;border-radius:16px;padding:40px 36px;width:400px;box-shadow:0 20px 60px rgba(0,0,0,.2)}
.logo{text-align:center;margin-bottom:28px}
.logo h2{font-size:24px;color:#1e293b}
.logo p{color:#94a3b8;font-size:13px;margin-top:4px}
label{display:block;font-size:13px;font-weight:bold;color:#475569;margin-bottom:5px}
.input-wrap{position:relative;margin-bottom:16px}
input{width:100%;padding:11px 14px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;transition:.2s}
input:focus{outline:none;border-color:#667eea;box-shadow:0 0 0 3px rgba(102,126,234,.15)}
.btn{width:100%;padding:12px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:bold;cursor:pointer;margin-top:6px;transition:.2s}
.btn:hover{opacity:.9}
.btn:disabled{opacity:.6;cursor:not-allowed}
.alert{padding:11px 14px;border-radius:8px;font-size:13px;margin-bottom:16px;display:none}
.alert.error{background:#fee2e2;color:#dc2626;display:block}
.alert.success{background:#dcfce7;color:#16a34a;display:block}
.footer{text-align:center;margin-top:20px;font-size:13px;color:#64748b}
.footer a{color:#667eea;text-decoration:none;font-weight:bold}
.spinner{display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;margin-right:8px;vertical-align:middle}
@keyframes spin{to{transform:rotate(360deg)}}
</style>
</head>
<body>
<div class="card">
  <div class="logo">
    <h2>Welcome Back</h2>
    <p>Sign in to your account</p>
  </div>
  <div class="alert" id="alert"></div>
  <form id="loginForm">
    <label>Email Address</label>
    <div class="input-wrap">
      <input type="email" id="email" placeholder="sonu@example.com" required>
    </div>
    <label>Password</label>
    <div class="input-wrap">
      <input type="password" id="password" placeholder="••••••••" required>
    </div>
    <button type="submit" class="btn" id="btn">Login</button>
  </form>
  <div class="footer">Don't have an account? <a href="/signup">Sign Up</a></div>
</div>

<script>
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn   = document.getElementById('btn');
  const alert = document.getElementById('alert');

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>Logging in...';
  alert.className = 'alert';

  try {
    const res  = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:    document.getElementById('email').value,
        password: document.getElementById('password').value,
      })
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Login failed');

    localStorage.setItem('token', data.token);
    localStorage.setItem('user',  JSON.stringify(data.user));

    alert.className = 'alert success';
    alert.textContent = 'Login successful! Redirecting...';
    setTimeout(() => window.location.href = '/dashboard', 800);

  } catch (err) {
    alert.className = 'alert error';
    alert.textContent = err.message;
    btn.disabled = false;
    btn.textContent = 'Login';
  }
});

// Redirect if already logged in
if (localStorage.getItem('token')) window.location.href = '/dashboard';
</script>
</body>
</html>
