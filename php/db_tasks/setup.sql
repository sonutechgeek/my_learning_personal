-- Run this first to create database and tables

CREATE DATABASE IF NOT EXISTS learning_db;
USE learning_db;

CREATE TABLE IF NOT EXISTS users (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(100) NOT NULL,
    email    VARCHAR(150) UNIQUE NOT NULL,
    age      INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    user_id  INT NOT NULL,
    title    VARCHAR(200) NOT NULL,
    body     TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sample data
INSERT INTO users (name, email, age) VALUES
('Sonu',    'sonu@example.com',   25),
('Rahul',   'rahul@example.com',  30),
('Priya',   'priya@example.com',  22),
('Amit',    'amit@example.com',   28),
('Neha',    'neha@example.com',   26),
('Ravi',    'ravi@example.com',   35),
('Anjali',  'anjali@example.com', 24),
('Vikram',  'vikram@example.com', 31),
('Pooja',   'pooja@example.com',  27),
('Karan',   'karan@example.com',  29);

INSERT INTO posts (user_id, title, body) VALUES
(1, 'PHP Basics',       'PHP is a server-side scripting language.'),
(1, 'OOP in PHP',       'OOP stands for Object Oriented Programming.'),
(2, 'MySQL Tips',       'Always use prepared statements.'),
(3, 'JS vs PHP',        'Both are used for web development.'),
(4, 'Laravel Guide',    'Laravel is a PHP framework.'),
(5, 'REST APIs',        'APIs allow communication between systems.');
