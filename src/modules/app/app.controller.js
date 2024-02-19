import { ControllerUtils } from '../../utils/controller/controller.utils.js';
import { AppService } from './services/app.service.js';

export class AppController extends ControllerUtils {
  constructor () {
    super();

    this.appService = new AppService();
  }

  /**
   * centralize all defined routes into a single method
   */
  setupRouter () {
    this.appInformation();
  }

  /**
   * invoke the service to obtain a response for the specified endpoint
   */
  appInformation () {
    /**
     * @swagger
     * /api/v1/:
     *   get:
     *     summary: test swagger documentation
     *     description: description to test
     *     responses:
     *       '200':
     *         description: Successful response
     *       '404':
     *         description: User not found
    */
    this.router.get('/', (req, res) => {
      res.send(this.appService.responseMainRouter());
    });
  }
}
