import { createInstance, connectInstance, disconnectInstance } from '@/lib/services/evolution';
import { getDb } from '@/lib/db';
import axios from 'axios';

jest.mock('@/lib/db', () => ({
  getDb: jest.fn(() => ({
    prepare: jest.fn(() => ({
      run: jest.fn(),
      get: jest.fn(),
      all: jest.fn()
    }))
  }))
}));

describe('Evolution Service', () => {
  const mockAxios = axios.create() as jest.Mocked<typeof axios>;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createInstance', () => {
    it('should create a new instance', async () => {
      const mockResponse = { data: { success: true } };
      mockAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await createInstance('test-instance', 'user-123');
      
      expect(mockAxios.post).toHaveBeenCalledWith('/instance/create', {
        instanceName: 'test-instance'
      });
      expect(getDb).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('API Error'));
      
      await expect(createInstance('test-instance', 'user-123'))
        .rejects
        .toThrow('Falha ao criar instância');
    });
  });

  describe('connectInstance', () => {
    it('should connect an instance and return QR code', async () => {
      const mockResponse = { data: { qrcode: 'test-qr-code' } };
      mockAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await connectInstance('test-instance');
      
      expect(mockAxios.post).toHaveBeenCalledWith('/instance/connect/test-instance');
      expect(result).toBe('test-qr-code');
    });
  });

  describe('disconnectInstance', () => {
    it('should disconnect an instance', async () => {
      mockAxios.post.mockResolvedValueOnce({ data: { success: true } });

      await disconnectInstance('test-instance');
      
      expect(mockAxios.post).toHaveBeenCalledWith('/instance/logout/test-instance');
    });
  });
});