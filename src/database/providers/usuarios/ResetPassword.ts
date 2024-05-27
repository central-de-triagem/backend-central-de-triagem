import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { PasswordCrypto } from '../../../shared/services';
import { IResetToken } from '../../models';

export const resetPassword = async (token: string, newPassword: string): Promise<void | Error> => {
  const resetToken: IResetToken = await Knex(ETableNames.reset_password_token).select("*").where('token', token).first();

  if (!resetToken) {
    return new Error('Token inválido');
  }

  if (new Date() > new Date(resetToken.expires_at)) {
      return new Error('Token expirado');
  }

  try {
    const hashedPassword = await PasswordCrypto.hashPassword(newPassword);
    const result = await Knex(ETableNames.usuario).update({senha: hashedPassword}).where('id','=', resetToken.usuario_id);
    await Knex(ETableNames.reset_password_token).select("*").where('token', token).del();

    if(result > 0) return;
    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};