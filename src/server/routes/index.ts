import { Router } from 'express';
import { UsuariosController } from '../../controllers';
import { ensureAuthenticated, SecureAuthorization } from '../../shared/middleware';


const router = Router();

router.get('/', (req, res)=>{
  return res.send('API - Central de Triagem');
});

router.get('/usuarios', ensureAuthenticated, SecureAuthorization.coordenador, UsuariosController.getAllValidation, UsuariosController.getAll);
router.get('/usuarios/:id', ensureAuthenticated, SecureAuthorization.coordenador, UsuariosController.getByIdValidation, UsuariosController.getById);

router.post('/cadastrar', ensureAuthenticated, SecureAuthorization.coordenador, UsuariosController.signUpValidation, UsuariosController.signUp);
router.post('/reset-password', UsuariosController.resetPasswordValidation, UsuariosController.resetPassword);
router.post('/acessar', UsuariosController.signInValidation, UsuariosController.signIn);
router.post('/forgot-password', UsuariosController.forgotPasswordValidation, UsuariosController.forgotPassword);

export {router};