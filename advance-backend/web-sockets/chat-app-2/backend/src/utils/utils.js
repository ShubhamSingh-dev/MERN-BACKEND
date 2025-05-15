import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, //prevent client-side JS from accessing the cookie
    sameSite: "strict",
    secure: process.env.NODE_ENV === "development", //only send the cookie over HTTPS in development mode
  });

  return token;
};
