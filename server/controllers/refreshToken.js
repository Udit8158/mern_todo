import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "./JWT.js";

const refreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(401).json({ msg: "Unathorized" });

  // vefiy the old refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Forbidden" });

    // Generating new tokens
    const newAccessToken = generateAccessToken({
      name: decoded.name,
      email: decoded.email,
    });
    const newRefreshToken = generateRefreshToken({
      name: decoded.name,
      email: decoded.email,
    });

    res
      .status(200)
      .cookie("refreshToken", newRefreshToken, { httpOnly: true })
      .json({ accessToken: newAccessToken });
  });

  next();
};

export default refreshToken;
