import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import { Request } from 'express';

export interface GraphQLContext {
  req: Request;
  prisma: PrismaClient;
  redis: Redis;
  userId?: string | null;
}