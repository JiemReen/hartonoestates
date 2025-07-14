// lib/session.ts
import { SessionOptions } from 'iron-session';

export interface UserSession {
  user?: {
    email: string;
    role: string;
    isLoggedIn: boolean;
  };
}

export const sessionOptions: SessionOptions = {
  cookieName: 'myapp_session',
  password: process.env.SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
