export const getSearchSongs = async ({ search }: { search: string | null }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/getFilterSongs?search=${search}`
  );

  const data = await res.json();

  if (data.status) {
    return data.data;
  }

  return null;
};
