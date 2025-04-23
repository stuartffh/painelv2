import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { GET, PUT, DELETE } from '@/app/api/instances/[id]/route';
import { getDb } from '@/lib/db';
import * as evolutionService from '@/lib/services/evolution';

jest.mock('next-auth');
jest.mock('@/lib/db');
jest.mock('@/lib/services/evolution');

describe('Instance ID API Routes', () => {
  const mockSession = {
    user: {
      id: 'user-123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'client'
    }
  };

  const mockInstance = {
    id: 'inst-123',
    name: 'test-instance',
    status: 'disconnected',
    user_id: 'user-123'
  };

  const mockDb = {
    prepare: jest.fn(() => ({
      run: jest.fn(),
      get: jest.fn(() => mockInstance)
    }))
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);
    (getDb as jest.Mock).mockReturnValue(mockDb);
  });

  describe('GET /api/instances/[id]', () => {
    it('should return instance details', async () => {
      (evolutionService.getInstanceStatus as jest.Mock).mockResolvedValue({
        status: 'connected',
        battery: 80
      });

      const response = await GET(new NextRequest('http://localhost:3000'), {
        params: { id: 'inst-123' }
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('id', 'inst-123');
      expect(data).toHaveProperty('battery', 80);
    });

    it('should return 404 when instance not found', async () => {
      mockDb.prepare.mockImplementation(() => ({
        get: jest.fn(() => null)
      }));

      const response = await GET(new NextRequest('http://localhost:3000'), {
        params: { id: 'invalid-id' }
      });

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/instances/[id]', () => {
    it('should connect instance', async () => {
      const mockRequest = new NextRequest('http://localhost:3000', {
        method: 'PUT',
        body: JSON.stringify({ action: 'connect' })
      });

      (evolutionService.connectInstance as jest.Mock).mockResolvedValue('qr-code-data');

      const response = await PUT(mockRequest, {
        params: { id: 'inst-123' }
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('qrCode', 'qr-code-data');
    });

    it('should disconnect instance', async () => {
      const mockRequest = new NextRequest('http://localhost:3000', {
        method: 'PUT',
        body: JSON.stringify({ action: 'disconnect' })
      });

      const response = await PUT(mockRequest, {
        params: { id: 'inst-123' }
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('success', true);
      expect(evolutionService.disconnectInstance).toHaveBeenCalledWith('test-instance');
    });
  });

  describe('DELETE /api/instances/[id]', () => {
    it('should delete instance', async () => {
      const response = await DELETE(new NextRequest('http://localhost:3000'), {
        params: { id: 'inst-123' }
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('success', true);
      expect(mockDb.prepare).toHaveBeenCalledWith('DELETE FROM instances WHERE id = ?');
    });
  });
});