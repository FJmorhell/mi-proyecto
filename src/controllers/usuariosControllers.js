import pool from '../db.js';

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
export const createUsuarios = async (req, res) => {
  const { id_usuario, user, password, rol } = req.body;
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE user = ?', [user]);
    if (rows.length > 0) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }
  const [result] = await pool.query(
    'INSERT INTO usuarios (id_usuario, user, password, rol) VALUES (?, ?, ?, ?)',
    [id_usuario, user, password, rol]
  );
  res.json({ id_usuario, user, password, rol });
};
export const updateUsuarios = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, password, rol } = req.body;

    // 1. Verificar si el user ya existe en otro registro
    const [existing] = await pool.query(
      'SELECT * FROM usuarios WHERE user = ? AND id_usuario != ?',
      [user, id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso por otro usuario' });
    }

    // 2. Hacer el update
    const query = 'UPDATE usuarios SET user = ?, password = ?, rol = ? WHERE id_usuario = ?';
    const values = [user, password, rol, id];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: 'No se encontró el usuario a actualizar' });
    }

    // 3. Seleccionar el registro actualizado
    const [rowsSelect] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    res.json(rowsSelect[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
export const deleteUsuarios = async (req, res) => {
   try {
        const { id } = req.params;
        const query = 'DELETE FROM usuarios WHERE id_usuario = ?'
        const [ rows ] = await pool.query(query,[id]);
        if(rows.affectedRows === 0){
            res.status(404).json({error: 'No se encontro el usuario a eliminar'});
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({error: 'Error en el servidor'});
        console.log({error: error.message});
    }
  };