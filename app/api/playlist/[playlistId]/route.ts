import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { playlistId: string } }
) {
  const { playlistId } = params;

  if (!playlistId) {
    return NextResponse.json({
      status: false,
      message: 'Request params is missing!',
    });
  }

  try {
    const playlist = await prisma.playlist.findFirst({
      where: {
        id: playlistId,
        isActive: true,
      },
      include: {
        songs: {
          where: {
            isActive: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!playlist) {
      return NextResponse.json({
        status: false,
        message: 'Playlist details not found!',
      });
    }

    return NextResponse.json({
      status: true,
      data: { playlist: playlist },
      message: 'Playlist details fetched successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: String(error),
    });
  }
}
