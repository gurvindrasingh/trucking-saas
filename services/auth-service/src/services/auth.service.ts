import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { signJwt } from "../utils/jwt";
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

const eventBridge = new EventBridgeClient({ region: 'us-east-1' });

export const signupUser = async ({ name, email, password, phone, bio }: any) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  //Emit UserRegistered event to EventBridge
  const command = new PutEventsCommand({
    Entries: [
      {
        Source: 'auth-service',
        DetailType: 'UserRegistered',
        Detail: JSON.stringify({ id: user.id, name, phone, bio }),
        EventBusName: 'default',
      },
    ],
  });

  await eventBridge.send(command);

  const token = signJwt({ id: user.id });

  return { user, token };
};

export const loginUser = async ({ email, password }: any) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = signJwt({ id: user.id });

  return { user, token };
};
