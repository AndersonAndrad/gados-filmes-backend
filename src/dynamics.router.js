import { Router, json } from 'express'

import { CheckPasswordsEqual } from './middlewares/check.if.passwords.equal.js'
import { CheckUserExist } from './middlewares/check.user.exist.js'
import { ErrorMiddlewares } from './middlewares/error.middlewares.js'
import { AppController } from './modules/app/app.controller.js'
import { AuthController } from './modules/auth/auth.controller.js'
import { UserController } from './modules/user/user.controller.js'

export class DynamicsRoutes {
  constructor () {
    this.router = Router()
    this.json = json()
  }

  /**
   * integrate routes in the service based on controllers
   */
  setupRoutes () {
    this.router.use(this.json)
    const appController = new AppController()
    const userController = new UserController()
    const authController = new AuthController()

    this.router.use('/', appController.routes())
    this.router.use('/', authController.routes())
    this.router.use('/user', userController.routes())
    const checkUserExist = new CheckUserExist()
    const errorMiddlewares = new ErrorMiddlewares()

    this.router.use('/', appController.routes())
    this.router.use('/', checkUserExist.findUser(), CheckPasswordsEqual.checkPasswordsEqual(), userController.routes())

    this.router.use(errorMiddlewares.handleRequestErrors())
    this.router.use(errorMiddlewares.handleErro404())
  }

  /**
   * integrate all routes in the instance service
   * @param app
   */
  attachToApp (app) {
    app.use('/api/v1', this.router)
  }
}
