import { Router } from 'express';
import { UsuariosController } from '../../controllers';
import { ensureAuthenticated } from '../../shared/middleware';


const router = Router();

router.get('/', (req, res)=>{
  return res.send('API - Central de Triagem');
});

router.get('/usuarios', ensureAuthenticated, UsuariosController.getAllValidation, UsuariosController.getAll);
router.get('/usuarios/:id', ensureAuthenticated, UsuariosController.getByIdValidation, UsuariosController.getById);
router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp);
router.post('/login', UsuariosController.signInValidation, UsuariosController.signIn);

export {router};