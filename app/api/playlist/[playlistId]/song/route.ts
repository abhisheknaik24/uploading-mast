import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { playlistId: string } }
) {
  const { playlistId } = params;

  const url = new URL(req.url);

  const search = url.searchParams.get('search')?.trim().toLowerCase();

  const page = Number(url.searchParams.get('page'));

  if (!playlistId) {
    return NextResponse.json({
      status: false,
      message: 'Request params is missing!',
    });
  }

  try {
    let songs = [];

    if (search) {
      songs = await prisma.song.findMany({
        where: {
          playlistId: playlistId,
          title: {
            startsWith: search,
          },
          isActive: true,
        },
        skip: (page - 1) * 10,
        take: 10,
        orderBy: {
          createdAt: 'asc',
        },
      });
    } else {
      songs = await prisma.song.findMany({
        where: {
          playlistId: playlistId,
          isActive: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
    }

    return NextResponse.json({
      status: true,
      data: { songs: songs },
      message: 'Songs fetched successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: String(error),
    });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { playlistId: string } }
) {
  const { playlistId } = params;

  const {
    title,
    description,
    author,
    thumbnail,
    audio,
  }: {
    title: string;
    description: string;
    author: string;
    thumbnail: string;
    audio: string;
  } = await req.json();

  if (!playlistId) {
    return NextResponse.json({
      status: false,
      message: 'Request params is missing!',
    });
  }

  if (!title || !author || !audio) {
    return NextResponse.json({
      status: false,
      message: 'Request body is missing!',
    });
  }

  try {
    const song = await prisma.song.create({
      data: {
        playlistId: playlistId,
        title: title.trim().toLowerCase(),
        description: description.trim(),
        author: author.trim().toLowerCase(),
        thumbnail: thumbnail,
        audio: audio,
      },
    });

    return NextResponse.json({
      status: true,
      data: { song: song },
      message: 'Song added successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: String(error),
    });
  }
}
