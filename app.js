'use strict'

let Promise = require('promise')
let Hapi = require('hapi')
let http = require('http')
let Rimraf = require('rimraf')
let Routes = require('./routes')

const rimraf = Promise.denodeify(Rimraf)

class Api {
  constructor(port) {
    this._routes = new Set()
    this._server = http.createServer()
    this._serverListener = Promise.denodeify(this._server.listen)
    this.server = new Hapi.Server()
    this.serverStart = Promise.denodeify(this.server.start)
    this.port = port
    this._http = true
    this._start()
  }
  _connection() {
    if(this._http)
      this.server.connection({ 
        port:this.port,
        labels:['tcp']
      })
    if(process.env.SOCKET)
      this.server.connection({ 
        listener: this._server,
        autoListen:false,
        labels:['socket']
      })
  }

  _start() {
  
    this._connection()

    if(!process.env.SOCKET) return this._goStart()

    rimraf(process.env.SOCKET)
    .then(this._serverListener.bind(this._server,process.env.SOCKET))
    .done(() => this._goStart())
  }
  _goStart(){
    this.server.start( err => {
      this._routes.forEach( route => this.server.route(route))
      if (err) throw err
      console.log('Server LSQ-local API Started')
    })
  }
  addRoute(route){
    if (typeof route != 'object') return
    if (!this._routes.has(route)) return  
    this._routes.push(route)
    if(this._started)
      this.server.route(route)
  }

  addRoutes(routes){
    for ( const route in routes ){
      if (!this._routes.has(routes[route])){
        this._routes.add(routes[route])
        if(this._started)
          this.server.route(routes[route])
      }
    }
  }
}

const api = new Api(process.env.PORT || 3000,true)

api.addRoutes(Routes)

module.exports =  api