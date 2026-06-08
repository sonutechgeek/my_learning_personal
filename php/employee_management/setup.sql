USE learning_db;

CREATE TABLE IF NOT EXISTS admin_users (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS employees (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) UNIQUE NOT NULL,
    department VARCHAR(100),
    salary     DECIMAL(10,2),
    joined_at  DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Default admin: username=admin, password=admin123
INSERT IGNORE INTO admin_users (username, password)
VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

INSERT IGNORE INTO employees (name, email, department, salary, joined_at) VALUES
('Sonu Chaudhary',  'sonu@company.com',   'Engineering',  75000, '2023-01-15'),
('Rahul Sharma',    'rahul@company.com',  'Marketing',    55000, '2022-06-01'),
('Priya Singh',     'priya@company.com',  'HR',           50000, '2023-03-10'),
('Amit Verma',      'amit@company.com',   'Engineering',  80000, '2021-11-20'),
('Neha Gupta',      'neha@company.com',   'Finance',      60000, '2022-09-05');
