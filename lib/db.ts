import { Database } from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Garantir que o diretório existe
const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'evolution-api.db');
let db: Database | null = null;

// Função para inicializar o banco de dados
export function getDb() {
  if (!db) {
    // Importação dinâmica para evitar erros durante o build do Next.js
    const BetterSqlite3 = require('better-sqlite3');
    db = new BetterSqlite3(dbPath);
    
    // Inicializar tabelas
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

      CREATE TABLE IF NOT EXISTS instances (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        client_id TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'disconnected',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (client_id) REFERENCES users (id)
      );

      CREATE TABLE IF NOT EXISTS plans (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        instance_limit INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS subscriptions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        plan_id TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        start_date TEXT NOT NULL DEFAULT (datetime('now')),
        end_date TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (plan_id) REFERENCES plans (id)
      );

      CREATE TABLE IF NOT EXISTS activity_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        action TEXT NOT NULL,
        details TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `);

    // Inserir plano padrão se não existir
    const plansCount = db.prepare('SELECT COUNT(*) as count FROM plans').get();
    if (plansCount.count === 0) {
      db.prepare(`
        INSERT INTO plans (id, name, description, price, instance_limit)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        'plan_basic',
        'Básico',
        'Plano básico com 1 instância',
        29.90,
        1
      );
      
      db.prepare(`
        INSERT INTO plans (id, name, description, price, instance_limit)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        'plan_premium',
        'Premium',
        'Plano premium com 5 instâncias',
        99.90,
        5
      );
    }
  }
  
  return db;
}

// Usuários
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

// Instâncias
export function createInstance(instance: {
  id: string;
  name: string;
  client_id: string;
  status?: string;
}) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO instances (id, name, client_id, status)
    VALUES (?, ?, ?, ?)
  `);
  
  return stmt.run(
    instance.id,
    instance.name,
    instance.client_id,
    instance.status || 'disconnected'
  );
}

export function getInstanceById(id: string) {
  const db = getDb();
  return db.prepare('SELECT * FROM instances WHERE id = ?').get(id);
}

export function getInstancesByClientId(clientId: string) {
  const db = getDb();
  return db.prepare('SELECT * FROM instances WHERE client_id = ?').all(clientId);
}

export function getAllInstances() {
  const db = getDb();
  return db.prepare(`
    SELECT i.*, u.name as client_name 
    FROM instances i
    JOIN users u ON i.client_id = u.id
  `).all();
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

// Planos
export function getAllPlans() {
  const db = getDb();
  return db.prepare('SELECT * FROM plans').all();
}

// Logs
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

export function getAllLogs(limit = 100) {
  const db = getDb();
  return db.prepare(`
    SELECT l.*, u.name as user_name 
    FROM activity_logs l
    JOIN users u ON l.user_id = u.id
    ORDER BY l.created_at DESC
    LIMIT ?
  `).all(limit);
}

// Métricas
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