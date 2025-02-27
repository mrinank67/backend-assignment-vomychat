const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const csrfTokenFromCookie = req.cookies["XSRF-TOKEN"];
    if (!csrfTokenFromCookie) {
      return res.status(403).json({ message: "CSRF token missing" });
    }

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
