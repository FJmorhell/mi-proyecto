import { Router } from "express";
import { getFiado, createFiado, updateFiado, deleteFiado} from '../controllers/fiadoController.js'
import { authRequired } from "../middlewares/authRequired.js";

const router = Router();

router.get('/', authRequired, getFiado);
router.post('/', authRequired, createFiado);
router.put('/:id', authRequired, updateFiado);
router.delete('/:id', authRequired, deleteFiado);


export default router;