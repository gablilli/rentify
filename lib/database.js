const sqlite3 = require("sqlite3").verbose()
const path = require("path")
const fs = require("fs")

const DB_PATH = process.env.DATABASE_PATH || path.join(process.cwd(), "data", "rental.db")

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH)
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

class Database {
  constructor() {
    this.db = null
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
          reject(err)
        } else {
          console.log("Connected to SQLite database")
          this.initTables().then(resolve).catch(reject)
        }
      })
    })
  }

  async initTables() {
    const schema = `
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone TEXT,
        user_type TEXT NOT NULL CHECK (user_type IN ('landlord', 'tenant', 'agent', 'admin')),
        company_name TEXT,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Properties table
      CREATE TABLE IF NOT EXISTS properties (
        id TEXT PRIMARY KEY,
        owner_id TEXT NOT NULL,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        postal_code TEXT NOT NULL,
        province TEXT NOT NULL,
        property_type TEXT NOT NULL,
        rooms INTEGER,
        bathrooms INTEGER,
        area_sqm INTEGER,
        floor TEXT,
        has_elevator BOOLEAN DEFAULT 0,
        has_parking BOOLEAN DEFAULT 0,
        has_garden BOOLEAN DEFAULT 0,
        has_balcony BOOLEAN DEFAULT 0,
        is_furnished BOOLEAN DEFAULT 0,
        monthly_rent DECIMAL(10,2) NOT NULL,
        deposit_amount DECIMAL(10,2),
        monthly_expenses DECIMAL(10,2),
        description TEXT,
        notes TEXT,
        amenities TEXT, -- JSON string
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users(id)
      );

      -- Property images table
      CREATE TABLE IF NOT EXISTS property_images (
        id TEXT PRIMARY KEY,
        property_id TEXT NOT NULL,
        image_path TEXT NOT NULL,
        image_type TEXT DEFAULT 'photo',
        is_primary BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      );

      -- Tenants table
      CREATE TABLE IF NOT EXISTS tenants (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        fiscal_code TEXT UNIQUE NOT NULL,
        birth_date DATE NOT NULL,
        birth_place TEXT NOT NULL,
        id_document_type TEXT NOT NULL,
        id_document_number TEXT NOT NULL,
        id_document_expiry DATE NOT NULL,
        residence_address TEXT NOT NULL,
        residence_city TEXT NOT NULL,
        residence_postal_code TEXT NOT NULL,
        residence_province TEXT NOT NULL,
        emergency_contact_name TEXT,
        emergency_contact_phone TEXT,
        employer TEXT,
        monthly_income DECIMAL(10,2),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      -- Contracts table
      CREATE TABLE IF NOT EXISTS contracts (
        id TEXT PRIMARY KEY,
        property_id TEXT NOT NULL,
        primary_tenant_id TEXT NOT NULL,
        contract_type TEXT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        monthly_rent DECIMAL(10,2) NOT NULL,
        deposit_amount DECIMAL(10,2) NOT NULL,
        monthly_expenses DECIMAL(10,2),
        contract_terms TEXT,
        is_signed BOOLEAN DEFAULT 0,
        signed_date DATETIME,
        contract_file_path TEXT,
        status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'expired', 'terminated')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
        FOREIGN KEY (primary_tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
      );

      -- Contract roommates table
      CREATE TABLE IF NOT EXISTS contract_roommates (
        id TEXT PRIMARY KEY,
        contract_id TEXT NOT NULL,
        tenant_id TEXT NOT NULL,
        is_primary BOOLEAN DEFAULT 0,
        rent_share_percentage DECIMAL(5,2) DEFAULT 100.00,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE,
        FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
      );

      -- Payments table
      CREATE TABLE IF NOT EXISTS payments (
        id TEXT PRIMARY KEY,
        contract_id TEXT NOT NULL,
        tenant_id TEXT NOT NULL,
        payment_type TEXT NOT NULL CHECK (payment_type IN ('rent', 'deposit', 'expenses', 'penalty')),
        amount DECIMAL(10,2) NOT NULL,
        due_date DATE NOT NULL,
        paid_date DATE,
        payment_method TEXT,
        transaction_reference TEXT,
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'partial')),
        notes TEXT,
        receipt_path TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE,
        FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
      );

      -- Maintenance requests table
      CREATE TABLE IF NOT EXISTS maintenance_requests (
        id TEXT PRIMARY KEY,
        property_id TEXT NOT NULL,
        tenant_id TEXT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
        category TEXT NOT NULL,
        status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
        estimated_cost DECIMAL(10,2),
        actual_cost DECIMAL(10,2),
        scheduled_date DATE,
        completed_date DATE,
        contractor_name TEXT,
        contractor_phone TEXT,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
        FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE SET NULL
      );

      -- Maintenance images table
      CREATE TABLE IF NOT EXISTS maintenance_images (
        id TEXT PRIMARY KEY,
        maintenance_id TEXT NOT NULL,
        image_path TEXT NOT NULL,
        image_type TEXT DEFAULT 'before',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (maintenance_id) REFERENCES maintenance_requests(id) ON DELETE CASCADE
      );

      -- Documents table
      CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        entity_type TEXT NOT NULL,
        entity_id TEXT NOT NULL,
        document_type TEXT NOT NULL,
        document_name TEXT NOT NULL,
        file_path TEXT NOT NULL,
        file_size INTEGER,
        mime_type TEXT,
        uploaded_by TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
      );

      -- Messages table
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        sender_id TEXT NOT NULL,
        recipient_id TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT 0,
        read_at DATETIME,
        parent_message_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (parent_message_id) REFERENCES messages(id) ON DELETE SET NULL
      );

      -- Email notifications log
      CREATE TABLE IF NOT EXISTS email_notifications (
        id TEXT PRIMARY KEY,
        recipient_email TEXT NOT NULL,
        subject TEXT NOT NULL,
        template_name TEXT NOT NULL,
        template_data TEXT, -- JSON string
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
        sent_at DATETIME,
        error_message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Rent adjustments table
      CREATE TABLE IF NOT EXISTS rent_adjustments (
        id TEXT PRIMARY KEY,
        contract_id TEXT NOT NULL,
        adjustment_year INTEGER NOT NULL,
        istat_percentage DECIMAL(5,2) NOT NULL,
        old_rent DECIMAL(10,2) NOT NULL,
        new_rent DECIMAL(10,2) NOT NULL,
        effective_date DATE NOT NULL,
        is_applied BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE
      );

      -- Settings table
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        description TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Create indexes
      CREATE INDEX IF NOT EXISTS idx_properties_owner_id ON properties(owner_id);
      CREATE INDEX IF NOT EXISTS idx_contracts_property_id ON contracts(property_id);
      CREATE INDEX IF NOT EXISTS idx_contracts_tenant_id ON contracts(primary_tenant_id);
      CREATE INDEX IF NOT EXISTS idx_payments_contract_id ON payments(contract_id);
      CREATE INDEX IF NOT EXISTS idx_payments_due_date ON payments(due_date);
      CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
      CREATE INDEX IF NOT EXISTS idx_maintenance_property_id ON maintenance_requests(property_id);
      CREATE INDEX IF NOT EXISTS idx_maintenance_status ON maintenance_requests(status);
      CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
      CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
      CREATE INDEX IF NOT EXISTS idx_email_notifications_status ON email_notifications(status);
    `

    return new Promise((resolve, reject) => {
      this.db.exec(schema, (err) => {
        if (err) {
          reject(err)
        } else {
          console.log("Database tables initialized")
          resolve()
        }
      })
    })
  }

  async query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  async run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve({ id: this.lastID, changes: this.changes })
        }
      })
    })
  }

  async close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err)
        } else {
          console.log("Database connection closed")
          resolve()
        }
      })
    })
  }
}

module.exports = new Database()
