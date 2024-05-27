import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

enum ERoles {
  vizualizador = 1,
  triador = 2,
  coordenador = 3,
  admin = 4,
}

const authorize = (requiredRole: ERoles): RequestHandler => {
  return (req, res, next) => {
    const role = parseInt(req.headers["roleUsuario"] as string, 10);    
    if (isNaN(role) || role < requiredRole) {      
      return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: {
          default: "O usuário não possui permissão",
        },
      });
    }

    next();
  };
};

export const SecureAuthorization = {
    admin: authorize(ERoles.admin),
    coordenador: authorize(ERoles.coordenador),
    triador: authorize(ERoles.triador),
    visualizador: authorize(ERoles.vizualizador)
};
