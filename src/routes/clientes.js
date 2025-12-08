
import { Router } from "express";
import { getClientes, createCliente, updateCliente, deleteCliente} from '../controllers/clientesController.js'
import { authRequired } from "../middlewares/authRequired.js";

const router = Router();

router.get('/', authRequired, getClientes);
router.post('/', authRequired, createCliente);
router.put('/:id', authRequired, updateCliente);
router.delete('/:id', authRequired, deleteCliente);

export default router;

