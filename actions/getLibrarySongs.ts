export const getLibrarySongs = async ({ token }: { token: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/songs/getLibrarySongs`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return res.json();
};
