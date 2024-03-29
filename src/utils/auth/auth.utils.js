import jsonwebtoken from 'jsonwebtoken';
import { CustomHttpError } from '../../erros/customHttp.error.js';
import { Logger } from '../../infra/logger/logger.service.js';

export class UtilsAuth {
  constructor () {
    this.logger = new Logger(UtilsAuth.name);
  }

  createToken (id) {
    try {
      if (!id) {
        this.logger.dispatch('error', 'Erro ao criar o token - O ID não foi fornecido como parâmetro.');
        throw new CustomHttpError('Erro ao criar o token.');
      }

      const payload = { id };

      const secretKey = process.env.SECRET;

      return jsonwebtoken.sign(payload, secretKey, { expiresIn: '8h' });
    } catch (error) {
      this.logger.dispatch('error', `Erro durante a criação do token: ${error.message}`);
      CustomHttpError.checkAndThrowError(error);
    }
  }
}
