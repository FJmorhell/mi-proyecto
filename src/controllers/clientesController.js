
import pool from '../db.js';

 export const getClientes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

export const createCliente = async (req, res) => {
  const { id_cliente,nombre,apellido,telefonoo,direccion} = req.body;
  const [result] = await pool.query(
    'INSERT INTO clientes (id_cliente,nombre,apellido,telefonoo,direccion) VALUES (?, ?, ?, ?, ?)',
    [id_cliente,nombre,apellido,telefonoo,direccion]
  );
  res.json({ id_cliente, nombre, apellido, telefonoo, direccion });
};



export const updateCliente = async (req, res) => {
  try {
        const { id } = req.params;
        const { nombre, apellido, telefonoo, direccion } = req.body;
        const query = 'UPDATE clientes SET nombre = ?, apellido = ?, telefonoo = ?, direccion = ? WHERE id_cliente = ?'
        const values = [nombre,apellido,telefonoo,direccion,id];
        const [ rows ] = await pool.query(query,values);

        if(rows.affectedRows === 0){
            res.status(404).json({error: 'No se encontró el cliente a actualizar'})
        }
        const [ rowsSelect ] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?',[id])
        console.log(rowsSelect[0])
        res.json(rowsSelect[0]);

    } catch (error) {
        res.status(500).json({error: 'Error en el servidor'});
        console.log({error: error.message});
    }
};

export const deleteCliente = async (req, res) => {
   try {
        const { id } = req.params;
        const query = 'DELETE FROM clientes WHERE id_cliente = ?'
        const [ rows ] = await pool.query(query,[id]);
        if(rows.affectedRows === 0){
            res.status(404).json({error: 'No se encontro el cliente a eliminar'});
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({error: 'Error en el servidor'});
        console.log({error: error.message});
    }
  };
   


