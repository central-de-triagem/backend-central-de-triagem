import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsuariosProvider } from '../../database/providers/usuarios';
import { JWTService } from '../../shared/services';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';
import { PasswordCrypto } from '../../shared/services/PasswordCrypto';


interface IBodyProps extends Pick<IUsuario, 'matricula' | 'senha'> { }

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    matricula: yup.string().required().min(8),
    senha: yup.string().required().min(6),
  })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { matricula, senha } = req.body;

  const usuario = await UsuariosProvider.getByMatricula(matricula);  
  if (usuario instanceof Error || usuario.status === 0) {    
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Usuario ou senha são inválidos'
      }
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(senha, usuario.senha);  
  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Usuario ou senha são inválidos'
      }
    });
  } else {

    const accessToken = JWTService.sign({uid: usuario.id, urole: usuario.papel});

    if(accessToken === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar o token de acesso'
        }
      });
    }

    return res.status(StatusCodes.OK).json({ accessToken });
  }
};