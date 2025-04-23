import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import * as evolutionService from "@/lib/services/evolution";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
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

    const status = await evolutionService.getInstanceStatus(instance.name);
    return NextResponse.json({ ...instance, ...status });
  } catch (error) {
    console.error("Erro ao buscar instância:", error);
    return NextResponse.json(
      { error: "Erro ao buscar instância" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { action } = await req.json();
    if (!action) {
      return NextResponse.json(
        { error: "Ação é obrigatória" },
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

    switch (action) {
      case "connect":
        const qrCode = await evolutionService.connectInstance(instance.name);
        return NextResponse.json({ qrCode });

      case "disconnect":
        await evolutionService.disconnectInstance(instance.name);
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json(
          { error: "Ação inválida" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Erro ao atualizar instância:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar instância" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
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

    db.prepare("DELETE FROM instances WHERE id = ?").run(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir instância:", error);
    return NextResponse.json(
      { error: "Erro ao excluir instância" },
      { status: 500 }
    );
  }
}