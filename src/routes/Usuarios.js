import { Router } from "express";
import { getUsuarios,createUsuarios,updateUsuarios,deleteUsuarios} from '../controllers/usuariosControllers.js'
import { validateUser } from '../middlewares/validarUser.js'

const router = Router();

router.get('/', getUsuarios);
router.post('/', validateUser, createUsuarios);
router.put('/:id', updateUsuarios);
router.delete('/:id', deleteUsuarios);


export default router;
