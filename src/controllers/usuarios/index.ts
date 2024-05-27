import * as signIn from './SignIn';
import * as signUp from './SignUp';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as requestPasswordReset from './RequestPasswordReset';
import * as resetPassword from './ResetPassword';

export const UsuariosController = {
  ...signIn,
  ...signUp,
  ...getAll,
  ...getById,
  ...requestPasswordReset,
  ...resetPassword
};