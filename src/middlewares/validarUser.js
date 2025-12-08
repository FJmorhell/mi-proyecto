import pool from "../db.js"; 

export const validateUser = async (req, res, next) => {
  try {
    const { user, password } = req.body;

    // Valida campos obligatorios
    if (!user || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios (user o password)" });
    }

    // Valida que no exista un usuario con el mismo nombre
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE user = ?", [user]);

    if (rows.length > 0) {
      return res.status(400).json({ error: "Ya existe un usuario con ese nombre" });
    }

    next(); 
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};
