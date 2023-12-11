import { prisma } from '@/lib/prisma';
import CryptoJS from 'crypto-js';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({
      status: false,
      message: 'Request params is missing!',
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        isActive: true,
      },
      select: {
        id: true,
        username: true,
        picture: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        status: false,
        message: 'User details not found!',
      });
    }

    return NextResponse.json({
      status: true,
      data: { user: user },
      message: 'User details fetched successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: String(error),
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  const {
    currentPassword,
    newPassword,
    picture,
  }: { currentPassword: string; newPassword: string; picture: string } =
    await req.json();

  if (!userId) {
    return NextResponse.json({
      status: false,
      message: 'Request params is missing!',
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        isActive: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        status: false,
        message: 'User details not found!',
      });
    }

    if (currentPassword && newPassword) {
      const bytes = CryptoJS.AES.decrypt(
        user.password,
        process.env.CRYPTO_SECRET as string
      );

      const userPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (userPassword !== currentPassword) {
        return NextResponse.json({
          status: false,
          message: 'Current password incorrect!',
        });
      }

      const cipherPassword = CryptoJS.AES.encrypt(
        newPassword,
        process.env.CRYPTO_SECRET as string
      );

      await prisma.user.update({
        data: {
          password: cipherPassword.toString(),
        },
        where: {
          id: userId,
        },
      });
    }

    await prisma.user.update({
      data: {
        picture: picture,
      },
      where: {
        id: userId,
      },
    });

    return NextResponse.json({
      status: true,
      message: 'User details updated successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: String(error),
    });
  }
}
