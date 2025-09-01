import { abort } from 'process';
import { prisma } from '../prisma/client';

export const createProfileOnUserRegistered = async ( userId: string, name: string, phone: string, bio: string ) => {
  await prisma.profile.create({
    data: {
      userId: userId,
      name: name,
      phone: phone,
      avatar: '',
      bio: bio
    },
  });
};

export const updateProfileAvatar = async (userId: string, avatarUrl: string) => {
    await prisma.profile.update({
      where: { userId },
      data: { avatar: avatarUrl },
    });
};