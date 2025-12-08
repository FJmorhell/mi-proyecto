import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import { authRequired } from "../middlewares/authRequired.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Ejemplo de ruta protegida
router.get("/profile", authRequired, (req, res) => {
  res.json({ message: "Bienvenido al perfil", user: req.user });
});

export default router;

