// Types for Evolution API
export interface EvolutionInstance {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'initializing' | 'error';
  qrcode?: string;
  phone?: string;
  battery?: number;
  messages?: number;
  lastActive?: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'document';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface WebhookEvent {
  event: string;
  instance: string;
  data: any;
}