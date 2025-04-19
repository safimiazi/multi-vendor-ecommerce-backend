import e from "express";
import jwt from "jsonwebtoken";
const generateToken = (
  payload: Record<string, unknown>,
  secret: jwt.Secret,
  expiresIn:  number
): string => {
  const token = jwt.sign(
    {
      exp: Number(expiresIn),
      data: payload,
    },
    secret
  );

  return token;
};

export default generateToken;
