export const getSongs = async ({ category }: { category: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/getSongs`);

  const data = await res.json();

  if (data.status) {
    return data.data;
  }

  return null;
};
