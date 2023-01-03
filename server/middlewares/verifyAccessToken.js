import jwt from "jsonwebtoken";

const verifyAccessToken = (req, res, next) => {
  // Verify the access token present in the headers
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "Unauthorized" });

  const accessToken = authHeader.split(" ")[1];

  // Verify access token
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Forbidden" });

    // Set user in the request
    req.user = decoded;
    next();
  });
};

export default verifyAccessToken;
