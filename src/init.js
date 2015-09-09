require('babel/register')({
  stage: 0
});

require('source-map-support').install();

require('./server.js');
