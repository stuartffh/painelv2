import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

// Garantir que o diretório existe
const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'evolution-api.db');
let db: Database.Database | null = null;

export function getDb() {
  if (!db) {
    db = new Database(dbPath);
    
    // Criar tabelas
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'client',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS plans (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        instance_limit INTEGER NOT NULL,
        features TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS subscriptions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        plan_id TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        start_date TEXT NOT NULL DEFAULT (datetime('now')),
        end_date TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (plan_id) REFERENCES plans(id)
      );

      CREATE TABLE IF NOT EXISTS instances (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        user_id TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'disconnected',
        phone TEXT,
        qr_code TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS activity_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        action TEXT NOT NULL,
        details TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
      CREATE INDEX IF NOT EXISTS idx_instances_user_id ON instances(user_id);
      CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
    `);

    // Inserir planos padrão se não existirem
    const plansCount = db.prepare('SELECT COUNT(*) as count FROM plans').get();
    if (plansCount.count === 0) {
      db.prepare(`
        INSERT INTO plans (id, name, description, price, instance_limit, features)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        randomUUID(),
        'Básico',
        'Plano básico com 1 instância',
        29.90,
        1,
        JSON.stringify(['1 instância', 'Suporte por email', 'Acesso ao painel básico'])
      );
      
      db.prepare(`
        INSERT INTO plans (id, name, description, price, instance_limit, features)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        randomUUID(),
        'Profissional',
        'Plano profissional com 5 instâncias',
        99.90,
        5,
        JSON.stringify(['5 instâncias', 'Suporte prioritário', 'Acesso completo ao painel', 'Automações básicas'])
      );

      db.prepare(`
        INSERT INTO plans (id, name, description, price, instance_limit, features)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        randomUUID(),
        'Empresarial',
        'Plano empresarial com 15 instâncias',
        249.90,
        15,
        JSON.stringify(['15 instâncias', 'Suporte 24/7', 'Acesso completo ao painel', 'Automações avançadas', 'API personalizada'])
      );
    }
  }
  
  return db;
}

// Funções de usuário
export function createUser(user: {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
}) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO users (id, name, email, password, role)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  return stmt.run(
    user.id,
    user.name,
    user.email,
    user.password,
    user.role || 'client'
  );
}

export function getUserByEmail(email: string) {
  const db = getDb();
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

export function getUserById(id: string) {
  const db = getDb();
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

export function getAllUsers() {
  const db = getDb();
  return db.prepare('SELECT id, name, email, role, created_at FROM users').all();
}

// Funções de instância
export function createInstance(instance: {
  id: string;
  name: string;
  user_id: string;
  status?: string;
}) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO instances (id, name, user_id, status)
    VALUES (?, ?, ?, ?)
  `);
  
  return stmt.run(
    instance.id,
    instance.name,
    instance.user_id,
    instance.status || 'disconnected'
  );
}

export function getInstanceById(id: string) {
  const db = getDb();
  return db.prepare('SELECT * FROM instances WHERE id = ?').get(id);
}

export function getInstancesByUserId(userId: string) {
  const db = getDb();
  return db.prepare('SELECT * FROM instances WHERE user_id = ?').all(userId);
}

export function updateInstanceStatus(id: string, status: string) {
  const db = getDb();
  const stmt = db.prepare(`
    UPDATE instances 
    SET status = ?, updated_at = datetime('now')
    WHERE id = ?
  `);
  
  return stmt.run(status, id);
}

// Funções de assinatura
export function createSubscription(subscription: {
  id: string;
  user_id: string;
  plan_id: string;
  status?: string;
  end_date?: string;
}) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO subscriptions (id, user_id, plan_id, status, end_date)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  return stmt.run(
    subscription.id,
    subscription.user_id,
    subscription.plan_id,
    subscription.status || 'pending',
    subscription.end_date || null
  );
}

export function getActiveSubscriptionByUserId(userId: string) {
  const db = getDb();
  return db.prepare(`
    SELECT s.*, p.name as plan_name, p.instance_limit 
    FROM subscriptions s
    JOIN plans p ON s.plan_id = p.id
    WHERE s.user_id = ? 
    AND s.status = 'active'
    AND (s.end_date IS NULL OR s.end_date > datetime('now'))
  `).get(userId);
}

// Funções de log
export function createLog(log: {
  id: string;
  user_id: string;
  action: string;
  details?: string;
}) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO activity_logs (id, user_id, action, details)
    VALUES (?, ?, ?, ?)
  `);
  
  return stmt.run(
    log.id,
    log.user_id,
    log.action,
    log.details || null
  );
}

export function getLogsByUserId(userId: string, limit = 50) {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM activity_logs 
    WHERE user_id = ? 
    ORDER BY created_at DESC
    LIMIT ?
  `).all(userId, limit);
}

// Métricas do dashboard
export function getDashboardMetrics() {
  const db = getDb();
  
  const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get();
  const totalInstances = db.prepare('SELECT COUNT(*) as count FROM instances').get();
  const activeInstances = db.prepare("SELECT COUNT(*) as count FROM instances WHERE status = 'connected'").get();
  const totalClients = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'client'").get();
  
  return {
    totalUsers: totalUsers.count,
    totalInstances: totalInstances.count,
    activeInstances: activeInstances.count,
    totalClients: totalClients.count
  };
}