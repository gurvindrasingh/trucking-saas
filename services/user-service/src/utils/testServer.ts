import { app, startApolloServer } from '../app';
import { prisma } from '../prisma/client'
import Redis from 'ioredis';

export const createTestServer = async () => {
  // Start the Apollo Server (applies middleware to Express)
  await startApolloServer();

  // Optionally override Redis or Prisma here if mocking
  return app as any;
};