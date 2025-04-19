import jwt from "jsonwebtoken";
const generateToken = (
  payload: Record<string, unknown>,
  secret: jwt.Secret,
  expiresIn: string | number
): string => {
  const token = jwt.sign(
    {
      exp: expiresIn,
      data: payload,
    },
    secret
  );

  return token;
};

export default generateToken;
