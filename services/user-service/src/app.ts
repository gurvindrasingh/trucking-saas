import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { typeDefs, resolvers } from './graphql';
import { GraphQLContext } from './types/context';
import { getUserIdFromToken } from './utils/auth';
import { prisma } from './prisma/client';
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis(process.env.REDIS_URL!);

const app: Application = express();

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
  context: ({ req }): GraphQLContext => ({
    req,
    prisma,
    redis,
    userId: getUserIdFromToken(req),
  }),
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

export async function startApolloServer(): Promise<void> {
  await server.start();
  server.applyMiddleware({ app });
}

export { app };