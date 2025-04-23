import { NextResponse } from 'next/server';
import { checkPaymentStatus } from '@/lib/services/payment';

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    
    // Validar token do webhook
    const token = req.headers.get('x-api-key');
    if (token !== process.env.MP_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }
    
    // Verificar status do pagamento
    if (data.type === 'payment') {
      await checkPaymentStatus(data.id);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao processar webhook do Mercado Pago:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}