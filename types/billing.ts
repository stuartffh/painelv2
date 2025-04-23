// Types for billing and subscriptions
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  instanceLimit: number;
  features: string[];
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

export interface Payment {
  id: string;
  subscriptionId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  method: 'pix' | 'credit_card' | 'boleto';
  createdAt: string;
  paidAt?: string;
}