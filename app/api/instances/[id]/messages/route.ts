import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import * as evolutionService from "@/lib/services/evolution";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { to, message } = await req.json();
    if (!to || !message) {
      return NextResponse.json(
        { error: "Destinatário e mensagem são obrigatórios" },
        { status: 400 }
      );
    }

    const db = getDb();
    const instance = db.prepare(`
      SELECT * FROM instances 
      WHERE id = ? AND user_id = ?
    `).get(params.id, session.user.id);

    if (!instance) {
      return NextResponse.json(
        { error: "Instância não encontrada" },
        { status: 404 }
      );
    }

    await evolutionService.sendMessage(instance.name, to, message);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem" },
      { status: 500 }
    );
  }
}