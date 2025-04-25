import { GraphQLContext } from '../../types/context';
import { Profile } from "../../generated/prisma";

export const profileResolvers = {
  Query: {
    profile: async (
      _: unknown,
      args: { userId: string },
      context: GraphQLContext
    ): Promise<Profile | null> => {
      return context.prisma.profile.findUnique({ where: { userId: args.userId } });
    },

    myProfile: async (
      _: unknown,
      __: unknown,
      context: GraphQLContext
    ): Promise<Profile | null> => {
      if (!context.userId) return null;
      return context.prisma.profile.findUnique({ where: { userId: context.userId } });
    },
  },

  Mutation: {
    createOrUpdateProfile: async (
      _: unknown,
      args: { name?: string; phone?: string; avatar?: string; bio?: string },
      context: GraphQLContext
    ): Promise<Profile> => {
      const { userId, prisma } = context;
      if (!userId) throw new Error("Unauthorized");

      const existing = await prisma.profile.findUnique({ where: { userId } });

      if (existing) {
        return prisma.profile.update({
          where: { userId },
          data: args,
        });
      }

      return prisma.profile.create({
        data: {
          userId,
          ...args,
        },
      });
    },
  },
};
