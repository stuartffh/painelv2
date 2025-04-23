import { CronJob } from 'cron';
import { getDb } from '../lib/db';
import { sendMessage } from '../lib/evolution-api';

const BILLING_INSTANCE = process.env.BILLING_INSTANCE;

async function processBilling() {
  const db = getDb();
  
  // Buscar assinaturas ativas que vencem hoje
  const subscriptions = db.prepare(`
    SELECT 
      s.*,
      u.name as user_name,
      u.email as user_email,
      p.name as plan_name,
      p.price as plan_price
    FROM subscriptions s
    JOIN users u ON s.user_id = u.id
    JOIN plans p ON s.plan_id = p.id
    WHERE s.status = 'active'
    AND date(s.end_date) = date('now')
  `).all();

  for (const sub of subscriptions) {
    try {
      // Enviar mensagem de cobrança
      await sendMessage(
        BILLING_INSTANCE!,
        sub.phone,
        `Olá ${sub.user_name}! Sua mensalidade do plano ${sub.plan_name} vence hoje. ` +
        `Valor: R$ ${sub.plan_price.toFixed(2)}. Acesse seu painel para renovar: https://panel.zapchatbr.com/faturamento`
      );
      
      // Registrar log
      db.prepare(`
        INSERT INTO activity_logs (id, user_id, action, details)
        VALUES (?, ?, ?, ?)
      `).run(
        randomUUID(),
        sub.user_id,
        'BILLING_NOTIFICATION',
        `Notificação de cobrança enviada para ${sub.plan_name}`
      );
    } catch (error) {
      console.error(`Erro ao processar cobrança para ${sub.user_name}:`, error);
    }
  }
}

// Iniciar cron job
const job = new CronJob(
  process.env.BILLING_SCHEDULE || '0 9 * * *',
  processBilling,
  null,
  true,
  'America/Sao_Paulo'
);

console.log('Cron job de cobrança iniciado');