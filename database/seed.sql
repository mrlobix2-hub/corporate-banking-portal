INSERT INTO settings (
  id, app_name, dashboard_title, full_name, address_line_1, city, postal_code, phone, iban, email
) VALUES (
  1,
  'Corporate Banking Portal',
  'Corporate Banking Portal',
  'Raja Zahid Hussain',
  '480 Kings Street',
  'Manchester',
  'M1 XXX',
  '+44 0000 000000',
  'GB00HBUK00000000000000',
  'admin@example.com'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO banks (bank_name, country_code, bank_type) VALUES
('HSBC', 'UK', 'UK'),
('Barclays', 'UK', 'UK'),
('NatWest', 'UK', 'UK'),
('Lloyds', 'UK', 'UK'),
('Santander', 'UK', 'UK'),
('HBL', 'PK', 'Pakistan'),
('UBL', 'PK', 'Pakistan'),
('MCB', 'PK', 'Pakistan'),
('Meezan', 'PK', 'Pakistan'),
('Bank Alfalah', 'PK', 'Pakistan'),
('Allied Bank', 'PK', 'Pakistan'),
('Faysal Bank', 'PK', 'Pakistan'),
('Standard Chartered Pakistan', 'PK', 'Pakistan'),
('Askari Bank', 'PK', 'Pakistan'),
('Bank Islami', 'PK', 'Pakistan')
ON CONFLICT DO NOTHING;

INSERT INTO accounts (account_name, bank_name, account_number, iban, swift_bic, sort_code, branch_code, currency, opening_balance) VALUES
('HSBC UK Main Account', 'HSBC', '00012345678', 'GB00HBUK1234567890', 'HBUKGB4B', '40-11-60', NULL, 'GBP', 25000.00),
('Pakistan Banks Ledger', 'Meezan', 'PK00123456789', 'PK00MEEZ0000123456789', 'MEZNPKKA', NULL, '001', 'PKR', 800000.00),
('Cash Wallet', 'Cash Wallet', 'CASH-001', NULL, NULL, NULL, NULL, 'GBP', 1500.00)
ON CONFLICT DO NOTHING;

INSERT INTO exchange_rates (base_currency, target_currency, rate) VALUES
('GBP', 'PKR', 380.000000),
('USD', 'PKR', 280.000000),
('EUR', 'PKR', 410.000000),
('GBP', 'USD', 1.270000)
ON CONFLICT (base_currency, target_currency) DO NOTHING;
