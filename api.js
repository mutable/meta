'use strict'

let fs = require('then-fs')
let Path = require('path')
let Meta = {}

Meta.whoami = (req, reply) => {
  reply({service: 'johnny five'})
}

Meta.config = (req, reply) => {
  let config = fs.readFile(Path.join(__dirname, 'config.json'))
    .then(JSON.parse, err => {
      if (err.code !== 'ENOENT') throw err
      return {}
    })
    .then(reply, reply)
}

Meta.services = (req, reply) => {
  reply(['www', 'api', 'email'])
}

Meta.service = (req, reply) => {
  reply(['127.0.0.1:8300', '127.0.0.1:8301', '127.0.0.1:8302'])
}

module.exports = Meta
