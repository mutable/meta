const Joi = require('joi');
const Meta = require('./api');

const routes = [];
module.exports = routes;

routes.push({
  method: 'GET',
  path: '/v1/config',
  config: {
    description: 'Get service config',
    tags: ['api', 'config', 'meta'],
    handler: Meta.config,
  },
});

routes.push({
  method: 'GET',
  path: '/v1/whoami',
  config: {
    description: 'Return info about the service calling this endpoint',
    tags: ['api', 'whoami', 'meta'],
    handler: Meta.whoami,
  },
});

routes.push({
  method: 'GET',
  path: '/v1/services',
  config: {
    description: 'List of services while in a service',
    tags: ['api', 'services', 'meta'],
    handler: Meta.services,
  },
});

routes.push({
  method: 'GET',
  path: '/v1/services/{service}',
  config: {
    description: 'List of a service\'s healthly instances',
    tags: ['api', 'service', 'meta'],
    handler: Meta.service,
  },
});
