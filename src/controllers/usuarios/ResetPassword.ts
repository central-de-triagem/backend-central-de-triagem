import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { JWTService } from '../../shared/services';
import { IUsuario } from '../../database/models';


interface IQueryProps {
  token?: string;
}

interface IBodyProps extends Pick<IUsuario, 'senha'>{
  senha: string;
  confirmarSenha: string;
}

export const updateByIdValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    senha: yup.string().required().min(6),
    confirmarSenha: yup.string().required().min(6),
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

  const jwtDataDecoded = JWTService.verify(req.query.token);

  if(jwtDataDecoded === 'JWT_SECRET_NOT_FOUND') {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Erro ao verificar o token'
      }
    });
  }else if(jwtDataDecoded === 'INVALID_TOKEN'){
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Não autenticado'
      }
    });
  }

  const result = await UsuariosProvider.resetPassword(jwtDataDecoded.uid, req.body);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};