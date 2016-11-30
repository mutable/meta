'use strict'

let Meta = {}

Meta.whoami = (req, reply) => {
  reply({service: 'johnny five'})
}

Meta.config = (req, reply) => {
  reply({data: 'blah'})
}

Meta.services = (req, reply) => {
  reply(['www', 'api', 'email'])
}

Meta.service = (req, reply) => {
  reply(['127.0.0.1:8300', '127.0.0.1:8301', '127.0.0.1:8302'])
}

module.exports = Meta
