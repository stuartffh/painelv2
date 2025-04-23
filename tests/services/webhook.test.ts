import { handleWebhook } from '@/lib/services/webhook';
import { getDb } from '@/lib/db';

jest.mock('@/lib/db');

describe('Webhook Service', () => {
  const mockDb = {
    prepare: jest.fn(() => ({
      run: jest.fn()
    }))
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getDb as jest.Mock).mockReturnValue(mockDb);
  });

  it('should handle message events', async () => {
    const event = {
      event: 'message',
      instance: 'test-instance',
      data: {
        from: '123456789',
        content: 'Test message'
      }
    };

    await handleWebhook(event);

    expect(mockDb.prepare).toHaveBeenCalled();
    expect(mockDb.prepare().run).toHaveBeenCalled();
  });

  it('should handle status events', async () => {
    const event = {
      event: 'status',
      instance: 'test-instance',
      data: {
        status: 'connected',
        battery: 80
      }
    };

    await handleWebhook(event);

    expect(mockDb.prepare).toHaveBeenCalled();
    expect(mockDb.prepare().run).toHaveBeenCalled();
  });

  it('should handle connection events', async () => {
    const event = {
      event: 'connection',
      instance: 'test-instance',
      data: {
        connected: true,
        phone: '123456789'
      }
    };

    await handleWebhook(event);

    expect(mockDb.prepare).toHaveBeenCalled();
    expect(mockDb.prepare().run).toHaveBeenCalled();
  });

  it('should throw error for invalid events', async () => {
    const event = {
      event: 'invalid',
      instance: 'test-instance',
      data: {}
    };

    await expect(handleWebhook(event)).rejects.toThrow();
  });
});