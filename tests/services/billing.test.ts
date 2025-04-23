import { processRecurringBilling } from '@/lib/services/billing';
import { createPayment } from '@/lib/services/payment';
import { sendMessage } from '@/lib/services/evolution';
import { getDb } from '@/lib/db';

jest.mock('@/lib/services/payment');
jest.mock('@/lib/services/evolution');
jest.mock('@/lib/db');

describe('Billing Service', () => {
  const mockDb = {
    prepare: jest.fn(() => ({
      run: jest.fn(),
      get: jest.fn(),
      all: jest.fn(() => [
        {
          id: 'sub-123',
          user_id: 'user-123',
          plan_id: 'plan-123',
          user_name: 'Test User',
          user_email: 'test@example.com',
          plan_name: 'Basic Plan',
          plan_price: 29.90,
          phone: '123456789'
        }
      ])
    }))
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getDb as jest.Mock).mockReturnValue(mockDb);
    (createPayment as jest.Mock).mockResolvedValue({
      subscriptionId: 'new-sub-123',
      paymentId: 'payment-123',
      qrCode: 'test-qr-code'
    });
  });

  it('should process recurring billing', async () => {
    await processRecurringBilling();

    expect(mockDb.prepare).toHaveBeenCalled();
    expect(createPayment).toHaveBeenCalledWith(
      'user-123',
      'plan-123',
      29.90
    );
    expect(sendMessage).toHaveBeenCalled();
  });

  it('should handle payment creation error', async () => {
    (createPayment as jest.Mock).mockRejectedValueOnce(
      new Error('Payment failed')
    );

    await processRecurringBilling();

    expect(mockDb.prepare).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO activity_logs')
    );
  });

  it('should handle notification error', async () => {
    (sendMessage as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to send message')
    );

    await processRecurringBilling();

    expect(createPayment).toHaveBeenCalled();
    expect(mockDb.prepare).toHaveBeenCalled();
  });
});