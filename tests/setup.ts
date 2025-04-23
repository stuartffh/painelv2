import { randomUUID } from 'crypto';

// Mock environment variables
process.env.EVOLUTION_API_URL = 'http://localhost:8080';
process.env.EVOLUTION_API_KEY = 'test-key';
process.env.MP_ACCESS_TOKEN = 'test-token';
process.env.DATABASE_URL = ':memory:';

// Mock crypto.randomUUID
jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => 'test-uuid')
}));

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn()
  }))
}));