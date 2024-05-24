import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export const seed = async(Knex: Knex) => {
  const [{count}] = await Knex(ETableNames.usuario).count<[{count: number}]>('* as count');

  if(!Number.isInteger(count) || Number(count) > 0) return;

  const cidadesToInsert = usuariosIniciais.map(usuario => usuario);

  await Knex(ETableNames.usuario).insert(cidadesToInsert);
};

const usuariosIniciais = [
  {
    nome: "Patrick",
    matricula: "p0969657",
    email: "patrickandretjmg@gmail.com",
    senha: "$2a$08$C3RmtiBczBIcw7Fd3Vzm2u/FyHYiMqv4D7fFl7RAuKFIEmqQWQAP2", // senha: 12345678
    perfil: "Coordenador",
    status: 1
  }
];