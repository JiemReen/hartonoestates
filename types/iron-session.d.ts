// types/iron-session.d.ts
import 'iron-session';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      email: string;
      role: string;
      isLoggedIn: boolean;
    };
  }
}
