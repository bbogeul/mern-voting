require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT; // process.env
// error handler import
const handle = require('./handlers/index');
// db
const db = require('./models');
// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJSdoc = require('swagger-jsdoc');

// swagger js doc options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'MERN-VOTING',
      version: '1.0.0',
      description: 'MONGO-EXPRESS.',
    },
    servers: [`http://localhost:${process.env.PORT}`],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
  apis: ['index.js'],
};
// swagger ui express options
const options = {
  explorer: true,
};
const swaggerDocs = swaggerJSdoc(swaggerOptions);

if (process.env.NODE_ENV === 'development') {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));
}
app.use(cors());
app.use(bodyParser.json());

/**
 * @swagger
 * /:
 *  get:
 *    tags:
 *      - Test
 *    description: Hello World
 *    responses:
 *      '200':
 *        description: success
 */
app.get('/', (req, res) => {
  res.json({ hello: 'hello world' });
});

// not found error
app.use(handle.notFound);

// error handler
app.use(handle.errorHandler);

app.listen(
  port,
  console.log(`Server working at ${port} at ${process.env.NODE_ENV}`),
);
