import 'dotenv/config';
import express from 'express';
import pool from './db.js';
import clientesRoutes from './routes/clientes.js';
import ventasRoutes from './routes/Ventas.js';
import usuariosRoutes from './routes/Usuarios.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/clientes', clientesRoutes);
app.use('/ventas', ventasRoutes);
app.use('/usuarios', usuariosRoutes);



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