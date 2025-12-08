import jwt from "jsonwebtoken";

const JWT_SECRET = "mipasswordsupersegura";

export const authRequired = (req, res, next) => {
  try {
    const token = req.cookies.token; // si usás cookies
    if (!token) return res.status(401).json({ error: "No autorizado" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: "Token inválido" });
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "Error en la autenticación" });
  }
};
