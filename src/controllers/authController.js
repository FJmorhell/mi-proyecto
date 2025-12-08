import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "mipasswordsupersegura"; 


export const register = async (req, res) => {
  try {
    const { id_usuario,user,password} = req.body;

    // Validamos que venga todo
    if (!id_usuario || !user || !password) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Revisamos si ya existe el usuario
    const [usuarioExistente] = await pool.query(
      'SELECT * FROM Usuarios WHERE user = ?',
      [user]
    );

    if (usuarioExistente.length > 0) {
      return res.status(400).json({ error: 'Usuario ya existen' });
    }

    // Hasheamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertamos el usuario en la DB
    const query = 'INSERT INTO Usuarios (id_usuario,user, password) VALUES (?, ?, ?)';
    const [result] = await pool.query(query, [id_usuario, user, hashedPassword]);

    // Creamos el token JWT
    const token = jwt.sign({ id: result.insertId, user }, JWT_SECRET, { expiresIn: '1h' });

    // Guardamos el token en cookies
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({ message: 'Usuario registrado correctamente', id: result.insertId, user });

  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ error: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { user, password } = req.body;

    // Buscar usuario
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE user = ?", [user]);
    if (rows.length === 0) {
      return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
    }

    const usuario = rows[0];

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, user: usuario.user, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Enviar token como cookie o en JSON
    res.cookie("token", token, { httpOnly: true }).json({
      message: "Login exitoso",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};


export const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logout exitoso" });
};

