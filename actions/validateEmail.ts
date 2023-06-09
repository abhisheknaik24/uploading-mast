export const validateEmail = async ({
  email,
  otp,
}: {
  email: string;
  otp: number;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/validateEmail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, otp: otp }),
  });

  return res.json();
};
