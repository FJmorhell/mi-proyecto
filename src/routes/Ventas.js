import { Router } from "express";
import { getVentas, createVentas, updateVentas, deleteVentas} from '../controllers/ventasController.js'

const router = Router();

router.get('/', getVentas);
router.post('/', createVentas);	
router.put('/:id', updateVentas);
router.delete('/:id', deleteVentas)

export default router;