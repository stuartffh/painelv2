"use client";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import * as evolutionService from "@/lib/services/evolution";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const db = getDb();
    const instances = db.prepare(`
      SELECT * FROM instances 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `).all(session.user.id);

    return NextResponse.json(instances);
  } catch (error) {
    console.error("Erro ao buscar instâncias:", error);
    return NextResponse.json(
      { error: "Erro ao buscar instâncias" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { name } = await req.json();
    if (!name) {
      return NextResponse.json(
        { error: "Nome da instância é obrigatório" },
        { status: 400 }
      );
    }

    const instance = await evolutionService.createInstance(name, session.user.id);
    return NextResponse.json(instance);
  } catch (error) {
    console.error("Erro ao criar instância:", error);
    return NextResponse.json(
      { error: "Erro ao criar instância" },
      { status: 500 }
    );
  }
}