import { ETableNames } from '../../ETableNames';
import { IUsuario } from '../../models';
import { Knex } from '../../knex';

export const getByMatricula = async (matricula: string): Promise<IUsuario | Error> => {
  try {
    const result = await Knex(ETableNames.usuario).select('*').where('matricula','=', matricula).first();

    if(result) return result;
    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};