// app/api/auth/session/route.ts
import { getIronSession } from 'iron-session';
import { sessionOptions, UserSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getIronSession<UserSession>(req, {} as any, sessionOptions); // <-- ubah ini

  if (!session.user) {
    return NextResponse.json({ isLoggedIn: false });
  }

  return NextResponse.json({
    isLoggedIn: true,
    email: session.user.email,
    role: session.user.role,
  });
}
