import { Router } from "express";
import { getVentas, createVentas, updateVentas, deleteVentas} from '../controllers/ventasController.js'
import { authRequired } from "../middlewares/authRequired.js";

const router = Router();

router.get('/', getVentas);
router.post('/', authRequired, createVentas);
router.put('/:id', authRequired, updateVentas);
router.delete('/:id', authRequired, deleteVentas);

export default router;