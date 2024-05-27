import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.reset_password_token, table => {
    table.bigIncrements('id').primary().index();
    table.bigInteger('usuario_id').index().notNullable().references('id').inTable(ETableNames.usuario).onUpdate('CASCADE').onDelete('RESTRICT');    
    table.string('token').notNullable().unique();
    table.timestamp('expires_at').notNullable();
    table.timestamps(true, true);
    
    table.comment('Tabela usada para armazenar tokens de reset de senhas');
  }).then( ()=> {
    console.log(`# Created table ${ETableNames.reset_password_token}`);
  });
}


export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.reset_password_token).then( ()=> {
    console.log(`# Dropped table ${ETableNames.reset_password_token}`);
  });
}