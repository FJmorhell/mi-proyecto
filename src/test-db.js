(async () => {
  try {
    const [clientes] = await pool.query('SELECT * FROM clientes');
    console.log('Clientes:', clientes);
    process.exit();
  } catch (err) {
    console.error('Error consultando clientes:', err);
  }
})();
