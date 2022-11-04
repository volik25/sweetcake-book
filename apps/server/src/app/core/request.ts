import { FastifyRequest } from 'fastify';
import FastifySessionPlugin from 'fastify-session';
import { UserSessionInterface } from '@interfaces/security/interfaces/user.session.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Session extends Record<string, any> {
  sessionId: string;
  encryptedSessionId: string;
  user: UserSessionInterface;
  token: string;

  touch(): void;

  regenerate(): void;

  destroy(callback: (err?: Error) => void): void;
}

export interface ApplicationRequest extends FastifyRequest {
  session: Session;
  sessionStore: FastifySessionPlugin.SessionStore;
}
