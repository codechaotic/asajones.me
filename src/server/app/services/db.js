module.exports = db;

db.$inject = [ 'robe', '_conf' ];
function db(robe,_conf) {
  return robe.connect(_conf.mongo_url);
}
