import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      userId?: string;
      id?: string;
      role?: string;
      token?: string;
    };
  }

  interface User {
    userId?: string;
    id?: string;
    role?: string;
    token?: string;
  }
}