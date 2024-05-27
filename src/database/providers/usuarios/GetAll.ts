import { ETableNames } from '../../ETableNames';
import { IUsuario } from '../../models';
import { Knex } from '../../knex';


export const getAll = async(page: number, limit: number, filter: string): Promise<Omit<IUsuario, 'senha'>[] | Error> => {
  try {
    const result = await Knex(ETableNames.usuario).select('id', 'nome', 'matricula', 'email', 'papel', 'status').where('nome', 'like', `%${filter}%`).offset((page - 1) * limit).limit(limit);
    
    return result;
  } catch (error) {
    return new Error('Erro ao consultar os registros');
  }
};