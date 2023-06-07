import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  let data = [
    {
      id: 1,
      title: 'You are my future - Startup',
      desc: 'You are my future - Startup by Red Velvet',
      author: 'Red Velvet',
      thumbnail:
        'https://i.ytimg.com/vi/oiNkumxPVzU/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IC4oITAP&amp;rs=AOn4CLBb8i24MCbiwA-ZOLEyEwZ2a1qdSg',
      audioLink: '/audio/you-are-my-future-startup.mp3',
      liked: true,
    },
    {
      id: 2,
      title: 'Bones - The Boys',
      desc: 'Bones - The Boys by Imagine Dragons',
      author: 'Imagine Dragons',
      thumbnail:
        'https://i.ytimg.com/vi/oiNkumxPVzU/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IC4oITAP&amp;rs=AOn4CLBb8i24MCbiwA-ZOLEyEwZ2a1qdSg',
      audioLink: '/audio/bones-the-boys.mp3',
      liked: true,
    },
    {
      id: 3,
      title: 'You are my future - Startup',
      desc: 'You are my future - Startup by Red Velvet',
      author: 'Red Velvet',
      thumbnail:
        'https://i.ytimg.com/vi/oiNkumxPVzU/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IC4oITAP&amp;rs=AOn4CLBb8i24MCbiwA-ZOLEyEwZ2a1qdSg',
      audioLink: '/audio/you-are-my-future-startup.mp3',
      liked: true,
    },
    {
      id: 4,
      title: 'You are my future - Startup',
      desc: 'You are my future - Startup by Red Velvet',
      author: 'Red Velvet',
      thumbnail:
        'https://i.ytimg.com/vi/oiNkumxPVzU/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IC4oITAP&amp;rs=AOn4CLBb8i24MCbiwA-ZOLEyEwZ2a1qdSg',
      audioLink: '/audio/you-are-my-future-startup.mp3',
      liked: true,
    },
    {
      id: 5,
      title: 'You are my future - Startup',
      desc: 'You are my future - Startup by Red Velvet',
      author: 'Red Velvet',
      thumbnail:
        'https://i.ytimg.com/vi/oiNkumxPVzU/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IC4oITAP&amp;rs=AOn4CLBb8i24MCbiwA-ZOLEyEwZ2a1qdSg',
      audioLink: '/audio/you-are-my-future-startup.mp3',
      liked: true,
    },
    {
      id: 6,
      title: 'You are my future - Startup',
      desc: 'You are my future - Startup by Red Velvet',
      author: 'Red Velvet',
      thumbnail:
        'https://i.ytimg.com/vi/oiNkumxPVzU/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IC4oITAP&amp;rs=AOn4CLBb8i24MCbiwA-ZOLEyEwZ2a1qdSg',
      audioLink: '/audio/you-are-my-future-startup.mp3',
      liked: true,
    },
    {
      id: 7,
      title: 'You are my future - Startup',
      desc: 'You are my future - Startup by Red Velvet',
      author: 'Red Velvet',
      thumbnail:
        'https://i.ytimg.com/vi/oiNkumxPVzU/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IC4oITAP&amp;rs=AOn4CLBb8i24MCbiwA-ZOLEyEwZ2a1qdSg',
      audioLink: '/audio/you-are-my-future-startup.mp3',
      liked: true,
    },
    {
      id: 8,
      title: 'You are my future - Startup',
      desc: 'You are my future - Startup by Red Velvet',
      author: 'Red Velvet',
      thumbnail:
        'https://i.ytimg.com/vi/oiNkumxPVzU/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IC4oITAP&amp;rs=AOn4CLBb8i24MCbiwA-ZOLEyEwZ2a1qdSg',
      audioLink: '/audio/you-are-my-future-startup.mp3',
      liked: true,
    },
    {
      id: 9,
      title: 'You are my future - Startup',
      desc: 'You are my future - Startup by Red Velvet',
      author: 'Red Velvet',
      thumbnail:
        'https://i.ytimg.com/vi/oiNkumxPVzU/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IC4oITAP&amp;rs=AOn4CLBb8i24MCbiwA-ZOLEyEwZ2a1qdSg',
      audioLink: '/audio/you-are-my-future-startup.mp3',
      liked: true,
    },
    {
      id: 10,
      title: 'You are my future - Startup',
      desc: 'You are my future - Startup by Red Velvet',
      author: 'Red Velvet',
      thumbnail:
        'https://i.ytimg.com/vi/oiNkumxPVzU/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IC4oITAP&amp;rs=AOn4CLBb8i24MCbiwA-ZOLEyEwZ2a1qdSg',
      audioLink: '/audio/you-are-my-future-startup.mp3',
      liked: false,
    },
  ];

  return NextResponse.json({
    status: true,
    data: data,
    message: 'Songs fetched successfully!',
  });
}
