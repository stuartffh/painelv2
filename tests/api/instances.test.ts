import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { GET, POST } from '@/app/api/instances/route';
import { getDb } from '@/lib/db';
import * as evolutionService from '@/lib/services/evolution';

jest.mock('next-auth');
jest.mock('@/lib/db');
jest.mock('@/lib/services/evolution');

describe('Instances API Routes', () => {
  const mockSession = {
    user: {
      id: 'user-123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'client'
    }
  };

  const mockDb = {
    prepare: jest.fn(() => ({
      run: jest.fn(),
      get: jest.fn(),
      all: jest.fn(() => [
        {
          id: 'inst-123',
          name: 'test-instance',
          status: 'disconnected'
        }
      ])
    }))
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);
    (getDb as jest.Mock).mockReturnValue(mockDb);
  });

  describe('GET /api/instances', () => {
    it('should return user instances', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(mockDb.prepare).toHaveBeenCalled();
    });

    it('should return 401 when not authenticated', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);
      
      const response = await GET();
      
      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/instances', () => {
    it('should create a new instance', async () => {
      const mockRequest = new NextRequest('http://localhost:3000/api/instances', {
        method: 'POST',
        body: JSON.stringify({ name: 'new-instance' })
      });

      (evolutionService.createInstance as jest.Mock).mockResolvedValue({
        id: 'inst-456',
        name: 'new-instance',
        status: 'disconnected'
      });

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('name', 'new-instance');
      expect(evolutionService.createInstance).toHaveBeenCalledWith(
        'new-instance',
        'user-123'
      );
    });

    it('should return 400 when name is missing', async () => {
      const mockRequest = new NextRequest('http://localhost:3000/api/instances', {
        method: 'POST',
        body: JSON.stringify({})
      });

      const response = await POST(mockRequest);
      
      expect(response.status).toBe(400);
    });
  });
});