const Promise = require('promise');
const Hapi = require('hapi');
const http = require('http');
const fs = require('then-fs');
const Routes = require('./routes');

class Api {
  constructor(port) {
    this._routes = new Set();
    this._server = http.createServer();
    this._serverListener = Promise.denodeify(this._server.listen);
    this.server = null;
    this.port = port;
    this._http = true;

    this.setup = {
      server: null,
      start: null,
      port,
    };

    if (process.env.SOCKET) {
      this.setup = Object.assign({}, this.setup, {
        extend: http.createServer(),
        listener: null,
        autoListen: false,
      });

      this.setup.listener = Promise.denodeify(this.setup.extend.listen);
    }

    this._start();
  }

  _connection() {
    if (!process.env.SOCKET) {
      this.server = new Hapi.Server({
        port: this.setup.port,
      });
    }

    if (process.env.SOCKET) {
      this.server = new Hapi.Server({
        listener: this._server,
        autoListen: false,
      });
    }
  }

  _start() {
    this._connection();
    if (!process.env.SOCKET) return this._goStart();
    return fs.unlink(process.env.SOCKET)
      .catch((err) => { if (err.code !== 'ENOENT') throw err; })
      .then(this._serverListener.bind(this._server, process.env.SOCKET))
      .done(() => this._goStart());
  }

  async _goStart() {
    try {
      await this.server.start();
      this._routes.forEach(route => this.server.route(route));
      console.log(`Server Mutable-local API Started at port ${this.setup.port}`);
    } catch (err) {
      throw err;
    }
  }

  addRoutes(routes) {
    Object.keys(routes).forEach((route) => {
      if (!this._routes.has(routes[route])) {
        this._routes.add(routes[route]);
      }
    });
  }
}

const api = new Api(process.env.PORT || 3000, true);

api.addRoutes(Routes);

module.exports = api;
