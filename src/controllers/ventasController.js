import pool from '../db.js';

export const getVentas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ventas');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener la venta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createVentas = async (req, res) => {
  const { id_venta,descripcion,total,fecha,estado,id_cliente} = req.body;
  const [result] = await pool.query(
    'INSERT INTO ventas (id_venta, descripcion, total, fecha, estado, id_cliente) VALUES (?, ?, ?, ?, ?, ?)',
    [id_venta, descripcion, total, fecha, estado, id_cliente]
  );
  res.json({ id_venta,descripcion,total,fecha,estado,id_cliente });
};

export const updateVentas = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, total, fecha, estado, id_cliente } = req.body;

    // Verificamos que el cliente exista
    const [cliente] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [id_cliente]);
    if (cliente.length === 0) {
      return res.status(400).json({ error: `No existe un cliente con id ${id_cliente}` });
    }

    // Actualizamos la venta
    const query = 'UPDATE ventas SET descripcion = ?, total = ?, fecha = ?, estado = ?, id_cliente = ? WHERE id_venta = ?';
    const values = [descripcion, total, fecha, estado, id_cliente, id];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: 'No se encontró la venta a actualizar' });
    }

    // Retornamos la venta actualizada
    const [rowsSelect] = await pool.query('SELECT * FROM ventas WHERE id_venta = ?', [id]);
    res.json(rowsSelect[0]);

  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
    console.log({ error: error.message });
  }
};


export const deleteVentas = async (req, res) => {
   try {
        const { id } = req.params;
        const query = 'DELETE FROM ventas WHERE id_venta = ?'
        const [ rows ] = await pool.query(query,[id]);
        if(rows.affectedRows === 0){
            res.status(404).json({error: 'No se encontro la venta a eliminar'});
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({error: 'Error en el servidor'});
        console.log({error: error.message});
    }
  };

