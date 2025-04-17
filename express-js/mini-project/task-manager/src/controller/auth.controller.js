export const Login = (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  req.session.user = { username };
  res.cookie("username", username, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.json({ message: "Login successful", username });
};

export const Logout = (req, res) => {
  res.clearCookie("username");
  res.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.json({ message: "Logout successful" });
  });
};
