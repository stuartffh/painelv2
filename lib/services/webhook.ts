import { WebhookEvent } from '@/types/evolution';
import { getDb } from '@/lib/db';
import { randomUUID } from 'crypto';
import * as evolutionService from './evolution';

export async function handleWebhook(event: WebhookEvent) {
  const db = getDb();
  
  try {
    // Registrar evento no log
    db.prepare(`
      INSERT INTO activity_logs (id, user_id, action, details)
      VALUES (?, ?, ?, ?)
    `).run(
      randomUUID(),
      event.instance,
      `WEBHOOK_${event.event.toUpperCase()}`,
      JSON.stringify(event.data)
    );

    switch (event.event) {
      case 'message':
        await handleMessage(event);
        break;
      case 'status':
        await handleStatus(event);
        break;
      case 'connection':
        await handleConnection(event);
        break;
    }
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    throw new Error('Falha ao processar webhook');
  }
}

async function handleMessage(event: WebhookEvent) {
  const db = getDb();
  const { instance, data } = event;

  // Atualizar contagem de mensagens
  db.prepare(`
    UPDATE instances 
    SET messages = messages + 1,
        updated_at = datetime('now')
    WHERE name = ?
  `).run(instance);
}

async function handleStatus(event: WebhookEvent) {
  const db = getDb();
  const { instance, data } = event;

  // Atualizar status da instância
  db.prepare(`
    UPDATE instances 
    SET status = ?,
        battery = ?,
        updated_at = datetime('now')
    WHERE name = ?
  `).run(data.status, data.battery, instance);
}

async function handleConnection(event: WebhookEvent) {
  const db = getDb();
  const { instance, data } = event;

  // Atualizar status de conexão
  db.prepare(`
    UPDATE instances 
    SET status = ?,
        phone = ?,
        updated_at = datetime('now')
    WHERE name = ?
  `).run(data.connected ? 'connected' : 'disconnected', data.phone, instance);
}