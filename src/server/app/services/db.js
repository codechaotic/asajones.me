module.exports = db;

db.$inject = [ 'robe', 'conf' ];
function db(robe, conf) {
  return robe.connect(conf.mongo_url);
}
