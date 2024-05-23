import { IUsuario } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {    
    usuario: IUsuario
  }
}