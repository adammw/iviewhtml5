var express = require('express');
var http = require('http');
var request = require('superagent');
var app = express();

app.use(express.logger());
app.use(express.static(__dirname));
app.use('/api2', function(req, res, next) {
  request('https://tviview.abc.net.au/iview/feed/samsung' + req.url)
    .set('Authorization', 'Basic ZmVlZHRlc3Q6YWJjMTIz')
    .end(function(err, cres) {
      res.writeHead(cres.statusCode, cres.headers);
    })
    .pipe(res);
});
app.use('/api', function(req, res, next) {
  /*request('http://ios.tviview.abc.net.au/api/ios' + req.url)
    .end(function(err, cres) {
      res.writeHead(cres.statusCode, cres.headers);
    })
    .pipe(res);*/
  http.request('http://ios.tviview.abc.net.au/api/ios' + req.url, function(cres) {
    res.writeHead(cres.statusCode, cres.headers);
    cres.pipe(res);
  }).end();
});


app.listen(3000);
console.log('Listening on port 3000');