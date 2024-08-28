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
