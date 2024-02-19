import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export class SwaggerConfig {
  constructor () {
    this.swaggerOptions = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Gados filmes API',
          version: '0.0.1',
          description: 'API para cadastro e avaliacao dos filmes'
        }
      },
      apis: ['*.controller.js', '*.middleware.js']
    };

    this.specs = swaggerJSDoc(this.swaggerOptions);
  }

  server () {
    return swaggerUi.serve;
  }

  ui () {
    return swaggerUi.setup(this.specs);
  }
}
