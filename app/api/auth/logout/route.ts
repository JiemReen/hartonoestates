import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';
import { sessionOptions, UserSession } from '@/lib/session';
import { getIronSession } from 'iron-session';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const [[user]]: any = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
  }

  const res = NextResponse.json({ message: 'Login success', role: user.role });

  const session = await getIronSession<UserSession>(req, res, sessionOptions);
  session.user = {
    email: user.email,
    role: user.role,
    isLoggedIn: true,
  };
  await session.save();

  return res;
}