const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'LightsOn API',
    version: '1.0.0',
    description: 'Documentazione API per LightsOn',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Server di sviluppo',
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'lo_access_token',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;