import * as create from './Create';
import * as getByEmail from './GetByEmail';
import * as getByAll from './GetAll';
import * as getById from './GetById';
import * as getByMatricula from './GetByMatricula';
import * as count from './Count';
import * as resetPassword from './ResetPassword';

export const UsuariosProvider = {
  ...create,
  ...getByEmail,
  ...getByAll,
  ...getById,
  ...getByMatricula,
  ...count,
  ...resetPassword,
};