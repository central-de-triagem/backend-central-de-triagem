import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { IUsuario } from '../../database/models';


interface IQueryProps {
  token?: string;
}

interface IBodyProps extends Pick<IUsuario, 'senha'>{
  senha: string;
  confirmarSenha: string;
}

export const resetPasswordValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    senha: yup.string().required().min(6),
    confirmarSenha: yup.string().oneOf([yup.ref('senha')], 'As senhas devem ser iguais').required().min(6),
  })),
  query: getSchema<IQueryProps>(yup.object().shape({
    token: yup.string().required(),
  }))
}));

export const resetPassword = async (req: Request<{}, {}, IBodyProps, IQueryProps>, res: Response) => {

  if(!req.query.token){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "token" na url precisa ser informado'
      }
    });
  }

  const result = await UsuariosProvider.resetPassword(req.query.token, req.body.senha);
  console.log(result)
  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.ACCEPTED).json(result);
};