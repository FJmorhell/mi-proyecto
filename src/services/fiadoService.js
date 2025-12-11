import { pool } from '../db.js';
import {obtenerFiadosDeCliente} from './fiadoController.js';

async function calcularDeudaTotal(id_cliente) {
  const listaFiados = await obtenerFiadosDeCliente(id_cliente);

  let deudaTotal = 0;

  for (let f of listaFiados) {
    if (!f.pagado) {
      deudaTotal += f.saldo_pendiente;
    }
  }

  return deudaTotal;
}