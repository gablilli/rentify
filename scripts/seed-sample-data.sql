-- Insert sample data for testing

-- Insert sample users (landlords and tenants)
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, user_type) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'mario.proprietario@email.com', '$2b$10$hash1', 'Mario', 'Proprietario', '+39 123 456 7890', 'landlord'),
('550e8400-e29b-41d4-a716-446655440002', 'laura.inquilina@email.com', '$2b$10$hash2', 'Laura', 'Inquilina', '+39 123 456 7891', 'tenant'),
('550e8400-e29b-41d4-a716-446655440003', 'giuseppe.rossi@email.com', '$2b$10$hash3', 'Giuseppe', 'Rossi', '+39 123 456 7892', 'tenant'),
('550e8400-e29b-41d4-a716-446655440004', 'anna.bianchi@email.com', '$2b$10$hash4', 'Anna', 'Bianchi', '+39 123 456 7893', 'tenant');

-- Insert sample properties
INSERT INTO properties (id, owner_id, name, address, city, postal_code, province, property_type, rooms, bathrooms, area_sqm, floor, has_elevator, has_parking, monthly_rent, deposit_amount, monthly_expenses, description) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Appartamento Via Roma', 'Via Roma 123', 'Milano', '20100', 'MI', 'apartment', 3, 2, 85, '2', true, true, 1200.00, 2400.00, 150.00, 'Bellissimo appartamento in zona centrale'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Monolocale Corso Italia', 'Corso Italia 45', 'Milano', '20122', 'MI', 'studio', 1, 1, 45, '4', true, false, 800.00, 1600.00, 80.00, 'Monolocale moderno e luminoso'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Casa Via Milano', 'Via Milano 78', 'Roma', '00100', 'RM', 'house', 4, 3, 120, 'PT', false, true, 1500.00, 3000.00, 200.00, 'Casa indipendente con giardino');

-- Insert sample tenants
INSERT INTO tenants (id, user_id, fiscal_code, birth_date, birth_place, id_document_type, id_document_number, id_document_expiry, residence_address, residence_city, residence_postal_code, residence_province, employer, monthly_income) VALUES
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'LRAINQ80A01H501Z', '1980-01-01', 'Milano (MI)', 'carta_identita', 'AB1234567', '2025-12-31', 'Via Verdi 10', 'Milano', '20100', 'MI', 'Tech Company SRL', 2500.00),
('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'GSPRSSI85B02H501W', '1985-02-02', 'Roma (RM)', 'patente', 'CD7890123', '2026-06-30', 'Via Garibaldi 20', 'Roma', '00100', 'RM', 'Marketing Agency', 2200.00),
('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', 'NNABCH90C03H501X', '1990-03-03', 'Napoli (NA)', 'carta_identita', 'EF4567890', '2027-03-15', 'Via Dante 30', 'Napoli', '80100', 'NA', 'Design Studio', 1800.00);

-- Insert sample contracts
INSERT INTO contracts (id, property_id, primary_tenant_id, contract_type, start_date, end_date, monthly_rent, deposit_amount, monthly_expenses, is_signed, status) VALUES
('880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'libero', '2024-01-01', '2028-01-01', 1200.00, 2400.00, 150.00, true, 'active'),
('880e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', 'concordato', '2024-02-01', '2027-02-01', 800.00, 1600.00, 80.00, true, 'active'),
('880e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', 'libero', '2024-03-01', '2028-03-01', 1500.00, 3000.00, 200.00, true, 'active');

-- Insert sample payments
INSERT INTO payments (contract_id, tenant_id, payment_type, amount, due_date, paid_date, status) VALUES
('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'rent', 1200.00, '2024-01-01', '2024-01-01', 'paid'),
('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'rent', 1200.00, '2024-02-01', '2024-02-01', 'paid'),
('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'rent', 1200.00, '2024-03-01', NULL, 'pending'),
('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', 'rent', 800.00, '2024-02-01', '2024-02-01', 'paid'),
('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', 'rent', 800.00, '2024-03-01', NULL, 'overdue'),
('880e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', 'rent', 1500.00, '2024-03-01', '2024-03-01', 'paid');

-- Insert sample maintenance requests
INSERT INTO maintenance_requests (property_id, tenant_id, title, description, priority, category, status) VALUES
('660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'Riparazione caldaia', 'La caldaia non funziona correttamente, acqua non abbastanza calda', 'high', 'heating', 'open'),
('660e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', 'Perdita rubinetto', 'Il rubinetto della cucina perde acqua', 'medium', 'plumbing', 'in_progress'),
('660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', 'Pulizia grondaie', 'Le grondaie necessitano di pulizia', 'low', 'maintenance', 'open');
