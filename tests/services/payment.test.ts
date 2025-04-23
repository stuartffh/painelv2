import { createPayment, checkPaymentStatus } from '@/lib/services/payment';
import { Payment } from 'mercadopago';
import { getDb } from '@/lib/db';
import QRCode from 'qrcode';

jest.mock('mercadopago');
jest.mock('qrcode');
jest.mock('@/lib/db');

describe('Payment Service', () => {
  const mockPayment = {
    create: jest.fn(),
    get: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (Payment as jest.Mock).mockImplementation(() => mockPayment);
  });

  describe('createPayment', () => {
    it('should create a payment and return QR code', async () => {
      const mockPaymentResponse = {
        id: 'payment-123',
        point_of_interaction: {
          transaction_data: {
            qr_code: 'test-qr-code'
          }
        },
        date_of_expiration: '2025-01-01T00:00:00Z'
      };

      mockPayment.create.mockResolvedValueOnce({ body: mockPaymentResponse });
      (QRCode.toDataURL as jest.Mock).mockResolvedValueOnce('data:image/png;base64,test');

      const result = await createPayment('user-123', 'plan-123', 99.90);

      expect(mockPayment.create).toHaveBeenCalled();
      expect(QRCode.toDataURL).toHaveBeenCalledWith('test-qr-code');
      expect(result).toHaveProperty('qrCode');
      expect(result).toHaveProperty('subscriptionId');
    });
  });

  describe('checkPaymentStatus', () => {
    it('should update subscription when payment is approved', async () => {
      mockPayment.get.mockResolvedValueOnce({
        status: 'approved',
        external_reference: 'sub-123'
      });

      const result = await checkPaymentStatus('payment-123');

      expect(mockPayment.get).toHaveBeenCalledWith({ id: 'payment-123' });
      expect(result).toBe(true);
    });

    it('should return false when payment is not approved', async () => {
      mockPayment.get.mockResolvedValueOnce({
        status: 'pending',
        external_reference: 'sub-123'
      });

      const result = await checkPaymentStatus('payment-123');

      expect(result).toBe(false);
    });
  });
});