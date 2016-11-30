'use strict'
let Joi = require('joi')
let Meta = require('./api')
let routes = []

routes.push({
  method: 'GET',
  path: '/v1/config',
  config: {
    description: 'Config ',
    notes: 'Get config from services',
    tags: ['api', 'config', 'meta'],
    validate: {
      query: {
        index: Joi.number().integer().min(1).default(0).description('The last minIndexNum of a response')
      }
    },
    handler: Meta.config
  }
})

routes.push({
  method: 'GET',
  path: '/v1/whoami',
  config: {
    description: 'WhoAmi ',
    notes: 'Find out who you are while in a service',
    tags: ['api', 'whoami', 'meta'],
    handler: Meta.whoami
  }
})

routes.push({
  method: 'GET',
  path: '/v1/services',
  config: {
    description: 'Services ',
    notes: 'List of services while in a service',
    tags: ['api', 'services', 'meta'],
    handler: Meta.services
  }
})

routes.push({
  method: 'GET',
  path: '/v1/services/{service}',
  config: {
    description: 'Service ',
    notes: 'List of a service\'s Healthly instances while in a service',
    tags: ['api', 'service', 'meta'],
    validate: {
      query: {
        index: Joi.number().integer().min(1).default(0).description('The last minIndexNum of a response')
      }
    },
    handler: Meta.service
  }
})
module.exports = routes
