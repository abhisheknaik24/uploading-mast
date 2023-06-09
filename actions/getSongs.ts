export const getSongs = async ({ categoryId }: { categoryId: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/songs/getSongs/${categoryId}`
  );

  return res.json();
};
