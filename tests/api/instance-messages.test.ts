import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { POST } from '@/app/api/instances/[id]/messages/route';
import { getDb } from '@/lib/db';
import * as evolutionService from '@/lib/services/evolution';

jest.mock('next-auth');
jest.mock('@/lib/db');
jest.mock('@/lib/services/evolution');

describe('Instance Messages API Route', () => {
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
    status: 'connected',
    user_id: 'user-123'
  };

  const mockDb = {
    prepare: jest.fn(() => ({
      get: jest.fn(() => mockInstance)
    }))
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);
    (getDb as jest.Mock).mockReturnValue(mockDb);
  });

  describe('POST /api/instances/[id]/messages', () => {
    it('should send message', async () => {
      const mockRequest = new NextRequest('http://localhost:3000', {
        method: 'POST',
        body: JSON.stringify({
          to: '123456789',
          message: 'Test message'
        })
      });

      const response = await POST(mockRequest, {
        params: { id: 'inst-123' }
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('success', true);
      expect(evolutionService.sendMessage).toHaveBeenCalledWith(
        'test-instance',
        '123456789',
        'Test message'
      );
    });

    it('should return 400 when parameters are missing', async () => {
      const mockRequest = new NextRequest('http://localhost:3000', {
        method: 'POST',
        body: JSON.stringify({})
      });

      const response = await POST(mockRequest, {
        params: { id: 'inst-123' }
      });

      expect(response.status).toBe(400);
    });

    it('should return 404 when instance not found', async () => {
      mockDb.prepare.mockImplementation(() => ({
        get: jest.fn(() => null)
      }));

      const mockRequest = new NextRequest('http://localhost:3000', {
        method: 'POST',
        body: JSON.stringify({
          to: '123456789',
          message: 'Test message'
        })
      });

      const response = await POST(mockRequest, {
        params: { id: 'invalid-id' }
      });

      expect(response.status).toBe(404);
    });
  });
});