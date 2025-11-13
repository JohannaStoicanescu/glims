import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(() => {
    service = new PrismaService();

    // Mock the Prisma client methods
    service.$connect = vi.fn().mockResolvedValue(undefined);
    service.$disconnect = vi.fn().mockResolvedValue(undefined);
  });

  describe('onModuleInit', () => {
    it('should connect to the database', async () => {
      await service.onModuleInit();

      expect(service.$connect).toHaveBeenCalledTimes(1);
    });

    it('should handle connection errors', async () => {
      const error = new Error('Connection failed');
      service.$connect = vi.fn().mockRejectedValue(error);

      await expect(service.onModuleInit()).rejects.toThrow('Connection failed');
    });
  });

  describe('onModuleDestroy', () => {
    it('should disconnect from the database', async () => {
      await service.onModuleDestroy();

      expect(service.$disconnect).toHaveBeenCalledTimes(1);
    });

    it('should handle disconnection errors', async () => {
      const error = new Error('Disconnection failed');
      service.$disconnect = vi.fn().mockRejectedValue(error);

      await expect(service.onModuleDestroy()).rejects.toThrow('Disconnection failed');
    });
  });

  describe('lifecycle', () => {
    it('should connect on init and disconnect on destroy', async () => {
      await service.onModuleInit();
      await service.onModuleDestroy();

      expect(service.$connect).toHaveBeenCalledTimes(1);
      expect(service.$disconnect).toHaveBeenCalledTimes(1);
    });
  });

  describe('instance', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should extend PrismaClient', () => {
      expect(service).toHaveProperty('$connect');
      expect(service).toHaveProperty('$disconnect');
    });
  });
});
