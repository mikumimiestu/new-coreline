CREATE DATABASE IF NOT EXISTS newcoreline;

USE newcoreline;

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY, -- Menggunakan VARCHAR untuk ID seperti '1011'
    access_code VARCHAR(255) UNIQUE NOT NULL,
    user_type ENUM(
        'student',
        'umum',
        'pro',
        'game'
    ) NOT NULL,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    subscription_type ENUM('free', 'plus', 'pro') NOT NULL DEFAULT 'free',
    subscription_period ENUM('monthly', 'yearly'),
    subscription_start DATETIME,
    subscription_end DATETIME,
    subscription_status ENUM(
        'active',
        'expired',
        'cancelled'
    ) NOT NULL DEFAULT 'active',
    created_at DATETIME NOT NULL,
    last_login DATETIME NOT NULL
);

CREATE TABLE subscriptions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    subscription_type ENUM('plus', 'pro') NOT NULL,
    period ENUM('monthly', 'yearly') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    status ENUM(
        'pending',
        'paid',
        'failed',
        'cancelled'
    ) NOT NULL,
    start_date DATETIME,
    end_date DATETIME,
    payment_date DATETIME,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);