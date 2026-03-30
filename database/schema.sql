CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  must_change_password BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY,
  app_name VARCHAR(200) NOT NULL,
  dashboard_title VARCHAR(200) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  address_line_1 VARCHAR(255),
  city VARCHAR(120),
  postal_code VARCHAR(50),
  phone VARCHAR(50),
  iban VARCHAR(100),
  email VARCHAR(150),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS banks (
  id SERIAL PRIMARY KEY,
  bank_name VARCHAR(150) NOT NULL,
  country_code VARCHAR(10) NOT NULL,
  bank_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL PRIMARY KEY,
  account_name VARCHAR(150) NOT NULL,
  bank_name VARCHAR(150) NOT NULL,
  account_number VARCHAR(100),
  iban VARCHAR(100),
  swift_bic VARCHAR(50),
  sort_code VARCHAR(50),
  branch_code VARCHAR(50),
  currency VARCHAR(10) NOT NULL,
  opening_balance NUMERIC(18,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS receipts (
  id SERIAL PRIMARY KEY,
  original_name VARCHAR(255) NOT NULL,
  stored_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exchange_rates (
  id SERIAL PRIMARY KEY,
  base_currency VARCHAR(10) NOT NULL,
  target_currency VARCHAR(10) NOT NULL,
  rate NUMERIC(18,6) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT exchange_rates_unique UNIQUE (base_currency, target_currency)
);

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
  transaction_id VARCHAR(100) NOT NULL,
  reference_number VARCHAR(100) NOT NULL,
  from_bank VARCHAR(150),
  to_bank VARCHAR(150),
  person_name VARCHAR(150),
  iban VARCHAR(100),
  swift VARCHAR(50),
  sort_code VARCHAR(50),
  branch_code VARCHAR(50),
  currency_sent VARCHAR(10) NOT NULL,
  currency_received VARCHAR(10) NOT NULL,
  exchange_rate NUMERIC(18,6),
  amount NUMERIC(18,2) NOT NULL,
  fee NUMERIC(18,2) NOT NULL DEFAULT 0,
  type VARCHAR(20) NOT NULL,
  category VARCHAR(50) NOT NULL,
  transaction_date DATE NOT NULL,
  notes TEXT,
  receipt_id INTEGER NULL REFERENCES receipts(id) ON DELETE SET NULL,
  manual_received_amount NUMERIC(18,2),
  running_balance NUMERIC(18,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
