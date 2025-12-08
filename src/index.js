import 'dotenv/config';
import express from 'express';
import pool from './db.js';
import clientesRoutes from './routes/clientes.js';
import ventasRoutes from './routes/Ventas.js';
import usuariosRoutes from './routes/Usuarios.js';
import fiadoRoutes from './routes/fiado.js';
import authRoutes from "./routes/auths.js";
import cookieParser from "cookie-parser";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/clientes', clientesRoutes);
app.use('/ventas', ventasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/fiado', fiadoRoutes);
app.use("/auths", authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
(async () => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
    console.log('Conexión a MySQL exitosa:', rows);
  } catch (err) {
    console.error('Error conectando a MySQL:', err);
  }
})();