import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsuariosProvider } from '../../database/providers/usuarios';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';
import { sendMail } from '../../shared/services/EmailService';

interface IBodyProps extends Pick<IUsuario, 'email'>{}

export const forgotPasswordValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email().min(5),      
    })
  )
}));

export const forgotPassword = async (req: Request<{},{}, IBodyProps>, res: Response) => {
  const result = await UsuariosProvider.requestPasswordReset(req.body.email); 

  if(result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  const sendEmailResult = await sendMail(req.body.email, result.token)
  if(sendEmailResult instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: sendEmailResult.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(sendEmailResult);
};
