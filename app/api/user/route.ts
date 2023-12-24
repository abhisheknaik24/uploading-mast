import { prisma } from '@/lib/prisma';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { password }: { password: string } = await req.json();

  if (!password) {
    return NextResponse.json({
      status: false,
      message: 'Request body is missing!',
    });
  }

  try {
    let user = await prisma.user.findFirst({
      where: {
        username: 'abhi',
        isActive: true,
      },
    });

    if (!user) {
      const cipherPassword = CryptoJS.AES.encrypt(
        'admin@123',
        process.env.CRYPTO_SECRET as string
      );

      user = await prisma.user.create({
        data: {
          username: 'abhi',
          password: cipherPassword.toString(),
        },
      });
    }

    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTO_SECRET as string
    );

    const userPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (userPassword !== password) {
      return NextResponse.json({
        status: false,
        message: 'Password incorrect!',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.NEXT_PUBLIC_JWT_SECRET as string,
      {
        expiresIn: '24h',
      }
    );

    cookies().set('token', token);

    return NextResponse.json({
      status: true,
      message: 'User sign in successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: String(error),
    });
  }
}
