const jwt = require("jsonwebtoken");

const authenticate = (token) => {
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    return 1;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return 2;
    }
    return 0;
  }
  // try {
  //   const decoded = jwt.verify(token, process.env.SECRET_KEY);
  //   const user = await User.findById(decoded.id).select("-password"); // Exclude password
  //   if (!user) {
  //     return res.status(404).json({ error: "User not found" });
  //   }
  //   res.json({ success: true, user });
  // } catch (error) {
  //   if (error instanceof jwt.TokenExpiredError) {
  //     return res
  //       .status(401)
  //       .json({ error: "Token expired. Please log in again." });
  //   }
  //   console.error("Error fetching user data:", error);
  //   res.status(500).json({ error: "Error fetching user data" });
  // }
};

const authorize = (token, role) => {
  try {
    const decrypted = jwt.verify(token, process.env.SECRET_KEY);
    if (decrypted.role === role) {
      return 1;
    }
    return 0;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return 2;
    }
    return 0;
  }
};

module.exports = { authenticate, authorize };
