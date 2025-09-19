import { Router } from "express";
import { getUsuarios,createUsuarios,updateUsuarios,deleteUsuarios} from '../controllers/usuariosControllers.js'

const router = Router();

router.get('/', getUsuarios);
router.post('/', createUsuarios);
router.put('/:id', updateUsuarios);
router.delete('/:id', deleteUsuarios);


export default router;