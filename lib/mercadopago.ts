import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function createPixPayment(
  amount: number,
  description: string,
  email: string
) {
  const payment = new Payment(client);
  
  const paymentData = {
    transaction_amount: amount,
    description: description,
    payment_method_id: 'pix',
    payer: {
      email: email,
    },
  };

  try {
    const result = await payment.create({ body: paymentData });
    return {
      qrCode: result.point_of_interaction.transaction_data.qr_code,
      qrCodeBase64: result.point_of_interaction.transaction_data.qr_code_base64,
      expirationDate: result.date_of_expiration,
    };
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    throw error;
  }
}

export async function checkPaymentStatus(paymentId: string) {
  const payment = new Payment(client);
  
  try {
    const result = await payment.get({ id: paymentId });
    return result.status;
  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error);
    throw error;
  }
}