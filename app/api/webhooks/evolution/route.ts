import { NextResponse } from 'next/server';
import { WebhookEvent } from '@/types/evolution';
import { handleWebhook } from '@/lib/services/webhook';

export async function POST(req: Request) {
  try {
    const event: WebhookEvent = await req.json();
    
    // Validar token do webhook
    const token = req.headers.get('x-api-key');
    if (token !== process.env.EVOLUTION_API_KEY) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }
    
    await handleWebhook(event);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}