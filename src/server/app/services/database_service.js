module.exports = database_service;

database_service.$inject = [
  'robe',
  'conf'
];

function database_service(robe, conf) {
  return robe.connect(conf.mongo_url)
}
