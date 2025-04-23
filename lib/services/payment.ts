import { Payment } from 'mercadopago';
import { getDb } from '@/lib/db';
import { randomUUID } from 'crypto';
import QRCode from 'qrcode';

const client = new Payment({
  accessToken: process.env.MP_ACCESS_TOKEN!
});

export async function createPayment(userId: string, planId: string, amount: number) {
  try {
    const db = getDb();
    const subscriptionId = randomUUID();
    
    // Criar assinatura pendente
    db.prepare(`
      INSERT INTO subscriptions (id, user_id, plan_id, status)
      VALUES (?, ?, ?, ?)
    `).run(subscriptionId, userId, planId, 'pending');
    
    // Criar pagamento no Mercado Pago
    const payment = await client.create({
      body: {
        transaction_amount: amount,
        payment_method_id: 'pix',
        external_reference: subscriptionId,
      }
    });
    
    // Gerar QR Code
    const qrCode = await QRCode.toDataURL(payment.point_of_interaction.transaction_data.qr_code);
    
    return {
      subscriptionId,
      paymentId: payment.id,
      qrCode,
      expirationDate: payment.date_of_expiration
    };
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    throw new Error('Falha ao criar pagamento');
  }
}

export async function checkPaymentStatus(paymentId: string) {
  try {
    const payment = await client.get({ id: paymentId });
    
    if (payment.status === 'approved') {
      const db = getDb();
      
      // Atualizar status da assinatura
      db.prepare(`
        UPDATE subscriptions 
        SET status = 'active', 
            start_date = datetime('now'),
            end_date = datetime('now', '+1 month')
        WHERE id = ?
      `).run(payment.external_reference);
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    throw new Error('Falha ao verificar pagamento');
  }
}