import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const playlists = await prisma.playlist.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({
      status: true,
      data: { playlists: playlists },
      message: 'Playlists fetched successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: String(error),
    });
  }
}

export async function POST(req: Request) {
  const { name }: { name: string } = await req.json();

  if (!name) {
    return NextResponse.json({
      status: false,
      message: 'Request body is missing!',
    });
  }

  try {
    const playlistExist = await prisma.playlist.findFirst({
      where: {
        name: name.trim().toLowerCase(),
        isActive: true,
      },
    });

    if (playlistExist) {
      return NextResponse.json({
        status: false,
        message: 'Playlist already exist!',
      });
    }

    const playlist = await prisma.playlist.create({
      data: {
        name: name.trim().toLowerCase(),
      },
    });

    return NextResponse.json({
      status: true,
      data: { playlist: playlist },
      message: 'Playlist added successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: String(error),
    });
  }
}
