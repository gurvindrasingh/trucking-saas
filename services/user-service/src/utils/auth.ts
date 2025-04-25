import jwt from 'jsonwebtoken';
import { Request } from 'express';

export function getUserIdFromToken(req: Request): string | null {
  const auth = req.headers.authorization || "";
  if (!auth) return null;

  try {
    const token = auth.replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    return payload.id;
  } catch {
    return null;
  }
}