import { ETableNames } from "../../ETableNames";
import { IResetToken } from "../../models";
import { Knex } from "../../knex";
import { v4 as uuidv4 } from "uuid";

export const requestPasswordReset = async (
  email: string
): Promise<IResetToken | Error> => {
  try {
    const result = await Knex(ETableNames.usuario)
      .select("*")
      .where("email", "=", email)
      .first();

    if (!result) return new Error("Usuário não encontrado!");

    const [resetToken] = await Knex(ETableNames.reset_password_token)
      .insert({
        token: uuidv4(),
        usuario_id: result.id,
        expires_at: new Date(Date.now() + 60 * 60 * 1000), // 1 hora a partir de agora
      })
      .returning("*");

    return resetToken;
  } catch (error) {
    return new Error("Erro ao tentar solicitar redefinição da senha: " + error);
  }
};
