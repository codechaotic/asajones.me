module.exports = conf;

function conf() {
  return {
    mongo_url:          process.env.MONGO_URL || 'mongodb://localhost/test',
    port:               process.env.PORT || 8080,
    root_dir:           __dirname,
    pub_dir:            __dirname + '/public'
  };
}
