import bcrypt from 'bcrypt'
import { CustomHttpError } from '../../../erros/custom.http.error.js'
import { CrudServiceUtils } from '../../../utils/crud/crud-service.utils.js'
import { UserRepository } from '../../user/repository/user.repository.js'
import { AuthValidatorSchema } from '../validators/auth.validator.schema.js'
import { UtilsAuth } from '../utils/utils.Auth.js'

export class AuthService extends CrudServiceUtils {
  constructor () {
    super()
    this.UserRepository = new UserRepository()
    this.authValidatorSchema = new AuthValidatorSchema()
    this.utilsAuth = new UtilsAuth()
  }

  async login (userData) {
    try {
      await this.authValidatorSchema.login(userData)

      const user = await this.UserRepository.findByLoginOrEmail(userData.login, userData.email)
      if (!user) {
        throw new CustomHttpError('Credenciais inválidas', 404)
      }

      await this.validatePassword(user.senha, userData.senha)

      const token = this.utilsAuth.createToken(user.id)

      return {
        usuario: { nome: user.nome, login: user.login },
        token
      }
    } catch (error) {
      CustomHttpError.checkAndThrowError(error)
    }
  }

  async validatePassword (userPassword, passwordtyped) {
    try {
      const passwordValid = await bcrypt.compare(passwordtyped, userPassword)

      if (!passwordValid) {
        throw new CustomHttpError('Não autorizado', 401)
      }
    } catch (error) {
      CustomHttpError.checkAndThrowError(error)
    }
  }
}
