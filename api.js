const fs = require('then-fs');
const Path = require('path');

const Meta = {};
module.exports = Meta;

let example = {};

fs.readFile(Path.join(__dirname, 'example.json'))
  .then((data) => { example = JSON.parse(data) })
  .catch(console.error);


Meta.whoami = () => example.SERVICE_INFO;

Meta.config = () => fs.readFile(Path.join(__dirname, '.config.json'))
  .then(JSON.parse)
  .catch(console.error)

Meta.services = () => example.SERVICES;

Meta.service = (req, h) => {
  const { service } = req.params;
  const containers = example.containers[service];
  if (!containers) return h.response({ error: 'Service not found' }).code(404);
  return containers[0];
}
