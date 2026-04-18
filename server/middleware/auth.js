const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ code:"USER_NEED_LOGIN", msg: "Non autenticato" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { userId: payload.userID };
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ code:"TOKEN_EXPIRED", msg: "Sessione scaduta" });
    }
    return res.status(401).json({ code:"TOKEN_INVALID", msg: "Token non valido" });
  }
}

module.exports = { requireAuth };