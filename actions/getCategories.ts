export const getCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/songs/getCategories`
  );

  return res.json();
};
