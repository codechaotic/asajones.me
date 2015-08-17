require('harmonize')();

require.ensure(['./server'], function(require) {
  require('./server');
},'server');
