export const addSongToLibrary = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/songs/addSongToLibrary`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    }
  );

  return res.json();
};
