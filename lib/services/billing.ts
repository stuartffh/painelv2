import { getDb } from '@/lib/db';
import { createPayment } from './payment';
import { sendMessage } from './evolution';
import { randomUUID } from 'crypto';

export async function processRecurringBilling() {
  const db = getDb();
  
  try {
    // Buscar assinaturas que vencem hoje
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
        // Criar novo pagamento
        const payment = await createPayment(
          sub.user_id,
          sub.plan_id,
          sub.plan_price
        );

        // Enviar notificação
        await sendBillingNotification(sub, payment);

        // Registrar log
        db.prepare(`
          INSERT INTO activity_logs (id, user_id, action, details)
          VALUES (?, ?, ?, ?)
        `).run(
          randomUUID(),
          sub.user_id,
          'BILLING_CREATED',
          JSON.stringify({
            subscription: sub.id,
            payment: payment.paymentId,
            amount: sub.plan_price
          })
        );
      } catch (error) {
        console.error(`Erro ao processar cobrança para ${sub.user_name}:`, error);
        
        // Registrar erro
        db.prepare(`
          INSERT INTO activity_logs (id, user_id, action, details)
          VALUES (?, ?, ?, ?)
        `).run(
          randomUUID(),
          sub.user_id,
          'BILLING_ERROR',
          JSON.stringify({
            subscription: sub.id,
            error: error.message
          })
        );
      }
    }
  } catch (error) {
    console.error('Erro ao processar cobranças recorrentes:', error);
    throw error;
  }
}

async function sendBillingNotification(subscription: any, payment: any) {
  const message = `Olá ${subscription.user_name}!\n\n` +
    `Sua assinatura do plano ${subscription.plan_name} vence hoje.\n` +
    `Valor: R$ ${subscription.plan_price.toFixed(2)}\n\n` +
    `Para renovar, acesse: https://zapchatbr.com/faturamento/${payment.subscriptionId}\n\n` +
    `Se preferir, você também pode pagar via PIX usando o QR Code que enviamos para seu email.`;

  try {
    await sendMessage(
      process.env.BILLING_INSTANCE!,
      subscription.phone,
      message
    );
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
  }
}