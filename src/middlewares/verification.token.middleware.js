import jsonwebtoken from 'jsonwebtoken'
import { CustomHttpError } from '../erros/custom.http.error.js'

export class VerificationTokenMiddleware {
  checkAuthToken () {
    return (req, res, next) => {
      const tokenHeaders = req.headers.authorization

      const token = tokenHeaders && tokenHeaders.split(' ')[1]

      if (!token) {
        throw new CustomHttpError('Token não existe', 401)
      }

      try {
        const secretKey = process.env.SECRET

        jsonwebtoken.verify(token, secretKey)

        next()
      } catch (error) {
        throw new CustomHttpError('Token inválido', 401)
      }
    }
  }
}
