export const getNewestSongs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/getNewestSongs`);

  const data = await res.json();

  if (data.status) {
    return data.data;
  }

  return null;
};
