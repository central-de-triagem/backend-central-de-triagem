import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsuariosProvider } from '../../database/providers/usuarios';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';

interface IBodyProps extends Omit<IUsuario, 'id'>{}

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      matricula: yup.string().required().min(8),
      email: yup.string().required().email().min(5),
      senha: yup.string().required().min(6),
      papel: yup.number().required(),
      status: yup.number().integer().positive().min(0).max(1).required()
    })
  )
}));

export const signUp = async (req: Request<{},{}, IBodyProps>, res: Response) => {
  const result = await UsuariosProvider.create(req.body); 

  if(result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
