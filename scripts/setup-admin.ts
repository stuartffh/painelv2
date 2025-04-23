import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { getDb } from '../lib/db';

async function setupAdmin() {
  const db = getDb();
  
  const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
  
  if (!adminEmail || !adminPassword) {
    console.error('Credenciais do admin não configuradas no .env');
    process.exit(1);
  }

  try {
    // Verificar se já existe um admin
    const existingAdmin = db.prepare('SELECT * FROM users WHERE role = ?').get('admin');
    
    if (existingAdmin) {
      console.log('Admin já existe no sistema');
      return;
    }

    // Criar admin
    const hashedPassword = await hash(adminPassword, 10);
    
    db.prepare(`
      INSERT INTO users (id, name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      randomUUID(),
      'Administrador',
      adminEmail,
      hashedPassword,
      'admin'
    );

    console.log('Admin criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar admin:', error);
    process.exit(1);
  }
}

setupAdmin();