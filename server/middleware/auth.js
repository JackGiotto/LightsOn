const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const token = req.cookies?.lo_access_token;

  if (!token) {
    return res.status(401).json({ code:"USER_NEED_LOGIN", msg: "Non autenticato" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { userId: payload.userID, role: payload.userRole };
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ code:"TOKEN_EXPIRED", msg: "Sessione scaduta" });
    }
    return res.status(401).json({ code:"TOKEN_INVALID", msg: "Token non valido" });
  }
}

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.auth || !allowedRoles.includes(req.auth.role)) {
      return res.status(403).json({ code: "FORBIDDEN", msg: "Accesso non consentito per questo ruolo" });
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };