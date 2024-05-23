import { ETableNames } from '../../ETableNames';
import { IUsuario } from '../../models';
import { Knex } from '../../knex';
import { PasswordCrypto } from '../../../shared/services';

export const resetPassword = async (id: number, usuario: Pick<IUsuario, 'senha'>): Promise<void | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);
    const result = await Knex(ETableNames.usuario).update({senha: hashedPassword}).where('id','=', id);

    if(result > 0) return;
    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};