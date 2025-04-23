import axios from 'axios';
import { EvolutionInstance, Message } from '@/types/evolution';
import { getDb } from '@/lib/db';
import { randomUUID } from 'crypto';

const api = axios.create({
  baseURL: process.env.EVOLUTION_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'apikey': process.env.EVOLUTION_API_KEY
  }
});

export async function createInstance(name: string, userId: string): Promise<EvolutionInstance> {
  try {
    const response = await api.post('/instance/create', { instanceName: name });
    
    const db = getDb();
    db.prepare(`
      INSERT INTO instances (id, name, user_id, status)
      VALUES (?, ?, ?, ?)
    `).run(randomUUID(), name, userId, 'disconnected');
    
    return response.data;
  } catch (error) {
    console.error('Erro ao criar instância:', error);
    throw new Error('Falha ao criar instância');
  }
}

export async function connectInstance(name: string): Promise<string> {
  try {
    const response = await api.post(`/instance/connect/${name}`);
    
    const db = getDb();
    db.prepare(`
      UPDATE instances 
      SET status = 'initializing', updated_at = datetime('now')
      WHERE name = ?
    `).run(name);
    
    return response.data.qrcode;
  } catch (error) {
    console.error('Erro ao conectar instância:', error);
    throw new Error('Falha ao conectar instância');
  }
}

export async function disconnectInstance(name: string): Promise<void> {
  try {
    await api.post(`/instance/logout/${name}`);
    
    const db = getDb();
    db.prepare(`
      UPDATE instances 
      SET status = 'disconnected', updated_at = datetime('now')
      WHERE name = ?
    `).run(name);
  } catch (error) {
    console.error('Erro ao desconectar instância:', error);
    throw new Error('Falha ao desconectar instância');
  }
}

export async function sendMessage(instance: string, to: string, message: string): Promise<void> {
  try {
    await api.post(`/message/text/${instance}`, {
      number: to,
      options: {
        delay: 1200,
        presence: "composing"
      },
      textMessage: {
        text: message
      }
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw new Error('Falha ao enviar mensagem');
  }
}

export async function getInstanceStatus(name: string): Promise<EvolutionInstance> {
  try {
    const response = await api.get(`/instance/connectionState/${name}`);
    
    const db = getDb();
    db.prepare(`
      UPDATE instances 
      SET status = ?, updated_at = datetime('now')
      WHERE name = ?
    `).run(response.data.state, name);
    
    return {
      name,
      status: response.data.state,
      phone: response.data.phone,
      battery: response.data.battery,
      lastActive: new Date().toISOString()
    };
  } catch (error) {
    console.error('Erro ao obter status da instância:', error);
    throw new Error('Falha ao obter status da instância');
  }
}

export async function setupWebhook(instance: string, url: string): Promise<void> {
  try {
    await api.post(`/webhook/set/${instance}`, {
      url,
      webhook_by_events: true,
      events: ['messages', 'status', 'connection']
    });
  } catch (error) {
    console.error('Erro ao configurar webhook:', error);
    throw new Error('Falha ao configurar webhook');
  }
}