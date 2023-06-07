export const postSongLike = async ({ id }: { id: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/getSongs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  });

  const data = await res.json();

  if (data.status) {
    return data.data;
  }

  return null;
};
