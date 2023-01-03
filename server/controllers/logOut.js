const logOut = (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthenticated" });

  // Clear refresh token from the cookie
  res.clearCookie("refreshToken").json({ msg: "Successfully logged out" });
};

export default logOut;
