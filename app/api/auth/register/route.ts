import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { getDb } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { name, email, password, plan } = await req.json();

    const db = getDb();

    // Verificar se o email já existe
    const existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 }
      );
    }

    // Criar usuário
    const hashedPassword = await hash(password, 10);
    const userId = randomUUID();

    db.prepare(`
      INSERT INTO users (id, name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `).run(userId, name, email, hashedPassword, "client");

    // Se um plano foi selecionado, criar assinatura
    if (plan) {
      const planData = db.prepare("SELECT * FROM plans WHERE id = ?").get(plan);
      if (planData) {
        db.prepare(`
          INSERT INTO subscriptions (id, user_id, plan_id, status, start_date, end_date)
          VALUES (?, ?, ?, ?, datetime('now'), datetime('now', '+1 month'))
        `).run(randomUUID(), userId, planData.id, "pending");
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao criar conta" },
      { status: 500 }
    );
  }
}