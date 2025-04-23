import { compare, hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createLog, createUser, getUserByEmail } from './db';

// Interface para usuário
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
}

// Registrar um novo usuário
export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: 'admin' | 'client' = 'client'
): Promise<User | null> {
  try {
    // Verificar se o usuário já existe
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return null;
    }

    // Gerar ID único e hash da senha
    const id = randomUUID();
    const hashedPassword = await hash(password, 10);

    // Criar o usuário no banco de dados
    createUser({
      id,
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Criar log de atividade
    createLog({
      id: randomUUID(),
      user_id: id,
      action: 'REGISTRO',
      details: `Usuário registrado com sucesso`,
    });

    // Retornar usuário sem a senha
    return {
      id,
      name,
      email,
      role,
    };
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return null;
  }
}

// Autenticar um usuário
export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  try {
    // Buscar usuário pelo email
    const user = getUserByEmail(email);
    if (!user) {
      return null;
    }

    // Verificar senha
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }

    // Criar log de atividade
    createLog({
      id: randomUUID(),
      user_id: user.id,
      action: 'LOGIN',
      details: 'Login realizado com sucesso',
    });

    // Retornar usuário sem a senha
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return null;
  }
}

// Definir cookie de sessão
export function setUserSession(user: User) {
  // Criar JWT token simples (em produção, usaria uma biblioteca apropriada)
  const session = Buffer.from(JSON.stringify(user)).toString('base64');
  
  // Definir cookie
  cookies().set({
    name: 'user_session',
    value: session,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });
}

// Obter usuário da sessão
export function getUserFromSession(): User | null {
  try {
    const session = cookies().get('user_session')?.value;
    if (!session) {
      return null;
    }

    // Decodificar o token
    const user = JSON.parse(Buffer.from(session, 'base64').toString());
    return user as User;
  } catch (error) {
    console.error('Erro ao obter usuário da sessão:', error);
    return null;
  }
}

// Logout (remover cookie)
export function clearUserSession() {
  cookies().delete('user_session');
}

// Verificar se usuário está autenticado
export function isAuthenticated() {
  return !!getUserFromSession();
}

// Verificar se o usuário é admin
export function isAdmin() {
  const user = getUserFromSession();
  return user?.role === 'admin';
}

// Middleware para rotas protegidas
export function requireAuth(
  isAdminRequired = false,
  redirectTo = '/login'
) {
  const user = getUserFromSession();
  
  if (!user) {
    redirect(redirectTo);
  }

  if (isAdminRequired && user.role !== 'admin') {
    redirect('/dashboard');
  }

  return user;
}