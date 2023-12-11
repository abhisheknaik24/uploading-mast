import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { playlistId: string; songId: string } }
) {
  const { playlistId, songId } = params;

  if (!playlistId || !songId) {
    return NextResponse.json({
      status: false,
      message: 'Request params is missing!',
    });
  }

  try {
    const song = await prisma.song.findFirst({
      where: {
        id: songId,
        playlistId: playlistId,
        isActive: true,
      },
    });

    if (!song) {
      return NextResponse.json({
        status: false,
        message: 'Song details not found!',
      });
    }

    const songs = await prisma.song.findMany({
      where: {
        playlistId: playlistId,
        isActive: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const songIds = songs.map((song) => song.id);

    const currentIndex = songIds.indexOf(songId);

    const previousSongId = currentIndex > 0 ? songIds[currentIndex - 1] : null;

    const nextSongId =
      currentIndex < songIds.length - 1 ? songIds[currentIndex + 1] : null;

    return NextResponse.json({
      status: true,
      data: {
        song: song,
        previousSongId: previousSongId,
        nextSongId: nextSongId,
      },
      message: 'Song details fetched successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: String(error),
    });
  }
}
