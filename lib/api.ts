// Biblioteca para integração com a Evolution API
const BASE_URL = process.env.EVOLUTION_API_URL || 'http://localhost:8080';
const API_KEY = process.env.EVOLUTION_API_KEY || '';

export type InstanceStatus = 'connected' | 'disconnected' | 'initializing' | 'error';

export interface Instance {
  instanceName: string;
  status: InstanceStatus;
  qrcode?: string;
  connectedAt?: string;
}

// Função auxiliar para fazer requisições
async function fetchApi(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'apikey': API_KEY,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in API request:', error);
    throw error;
  }
}

// Obter informações sobre todas as instâncias
export async function getAllInstancesInfo(): Promise<Instance[]> {
  try {
    const response = await fetchApi('/instance/fetchInstances');
    return response.instances || [];
  } catch (error) {
    console.error('Error fetching instances:', error);
    return [];
  }
}

// Criar uma nova instância
export async function createInstance(instanceName: string): Promise<boolean> {
  try {
    await fetchApi('/instance/create', 'POST', {
      instanceName,
    });
    return true;
  } catch (error) {
    console.error('Error creating instance:', error);
    return false;
  }
}

// Conectar uma instância existente (gera QR Code)
export async function connectInstance(instanceName: string): Promise<string | null> {
  try {
    const response = await fetchApi(`/instance/connect/${instanceName}`, 'POST');
    return response.qrcode || null;
  } catch (error) {
    console.error('Error connecting instance:', error);
    return null;
  }
}

// Desconectar uma instância
export async function disconnectInstance(instanceName: string): Promise<boolean> {
  try {
    await fetchApi(`/instance/logout/${instanceName}`, 'POST');
    return true;
  } catch (error) {
    console.error('Error disconnecting instance:', error);
    return false;
  }
}

// Reiniciar uma instância
export async function restartInstance(instanceName: string): Promise<boolean> {
  try {
    await fetchApi(`/instance/restart/${instanceName}`, 'POST');
    return true;
  } catch (error) {
    console.error('Error restarting instance:', error);
    return false;
  }
}

// Obter dados de uma instância específica
export async function getInstanceInfo(instanceName: string): Promise<Instance | null> {
  try {
    const response = await fetchApi(`/instance/connectionState/${instanceName}`);
    
    return {
      instanceName,
      status: response.state as InstanceStatus,
      connectedAt: response.connectedAt,
    };
  } catch (error) {
    console.error(`Error fetching instance info for ${instanceName}:`, error);
    return null;
  }
}

// Obter o QR Code para uma instância
export async function getInstanceQrCode(instanceName: string): Promise<string | null> {
  try {
    const response = await fetchApi(`/instance/qrcode/${instanceName}`);
    return response.qrcode;
  } catch (error) {
    console.error(`Error fetching QR code for ${instanceName}:`, error);
    return null;
  }
}