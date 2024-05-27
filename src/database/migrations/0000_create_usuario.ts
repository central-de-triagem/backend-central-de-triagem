import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.usuario, table => {
    table.bigIncrements('id').primary().index();
    table.string('nome').notNullable().checkLength('>', 3);
    table.string('matricula').index().unique().notNullable().checkLength('=', 8);
    table.string('email').index().unique().notNullable().checkLength('>=', 5);
    table.string('senha').notNullable().checkLength('>=', 8);    
    table.enu('papel', [1, 2, 3, 4], {useNative: true, existingType: true, enumName: 'foo_type'}).notNullable().defaultTo(1); // role 1=visualizador | 2=triador | 3=coordenador | 4=admin
    table.enu('status', [0, 1], {useNative: true, existingType: true, enumName: 'foo_type'}).notNullable();
    table.timestamp('created_at', {useTz: true}).defaultTo(knex.fn.now()).notNullable();
    
    table.comment('Tabela usada para armazenar usuários do sistema');
  }).then( ()=> {
    console.log(`# Created table ${ETableNames.usuario}`);
  });
}


export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.usuario).then( ()=> {
    console.log(`# Dropped table ${ETableNames.usuario}`);
  });
}