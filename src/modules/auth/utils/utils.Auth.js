import jsonwebtoken from 'jsonwebtoken'
import { CustomHttpError } from '../../../erros/custom.http.error.js'
export class UtilsAuth {
  createToken (id) {
    try {
      if (!id) {
        throw new CustomHttpError('Erro ao criar o token.')
      }

      const payload = { id }

      const secretKey = process.env.SECRET

      const token = jsonwebtoken.sign(payload, secretKey, { expiresIn: '8h' })

      return token
    } catch (error) {
      CustomHttpError.checkAndThrowError(error)
    }
  }
}
