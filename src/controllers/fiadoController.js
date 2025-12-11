import pool from '../db.js';
export const getFiado = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM fiado');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener fiado' });
  }
};

export const createFiado = async (req, res) => {
  const { fecha,monto,saldo_pendiente,pagado,id_cliente} = req.body;
  const [result] = await pool.query(
    'INSERT INTO fiado (fecha,monto,saldo_pendiente,pagado,id_cliente) VALUES (?, ?, ?, ?, ?)',
    [fecha,monto,saldo_pendiente,pagado,id_cliente]
  );
  res.json({ fecha,monto,saldo_pendiente,pagado,id_cliente });
};



export const updateFiado = async (req, res) => {
  try {
        const { id } = req.params;
        const { fecha,monto,saldo_pendiente,pagado,id_cliente } = req.body;
        const query = 'UPDATE fiado SET fecha = ?, monto = ?, saldo_pendiente = ?, pagado = ?, id_cliente = ? WHERE id = ?'
        const values = [fecha,monto,saldo_pendiente,pagado,id_cliente,id];
        const [ rows ] = await pool.query(query,values);

        if(rows.affectedRows === 0){
            res.status(404).json({error: 'No se encontró el fiado a actualizar'})
        }
        const [ rowsSelect ] = await pool.query('SELECT * FROM fiado WHERE id = ?',[id])
        console.log(rowsSelect[0])
        res.json(rowsSelect[0]);

    } catch (error) {
        res.status(500).json({error: 'Error en el servidor'});
        console.log({error: error.message});
    }
};

export const deleteFiado = async (req, res) => {
   try {
        const { id } = req.params;
        const query = 'DELETE FROM fiado WHERE id = ?'
        const [ rows ] = await pool.query(query,[id]);
        if(rows.affectedRows === 0){
            res.status(404).json({error: 'No se encontro el fiado a eliminar'});
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({error: 'Error en el servidor'});
        console.log({error: error.message});
    }
  };

async function obtenerFiadosDeCliente(id_cliente) {
  try {
    const sql = `
      SELECT id, id_cliente, saldo_pendiente, pagado
      FROM fiado
      WHERE id_cliente = ?
    `;

    // Ejecutar la consulta
    const [rows] = await pool.query(sql, [id_cliente]);

    // rows = array de filas (reemplaza la lista de objetos Java)
    return rows;

  } catch (error) {
    console.error("Error al obtener fiados:", error);
    return [];
  }
}




