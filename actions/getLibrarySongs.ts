export const getLibrarySongs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/getLibrarySongs`);

  const data = await res.json();

  if (data.status) {
    return data.data;
  }

  return null;
};
