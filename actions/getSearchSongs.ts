export const getSearchSongs = async ({ search }: { search: string | null }) => {
  let url: string = '';

  if (search) {
    url = `${process.env.NEXT_PUBLIC_API}/api/songs/getSearchSongs?search=${search}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_API}/api/songs/getSearchSongs`;
  }

  const res = await fetch(url);

  return res.json();
};
