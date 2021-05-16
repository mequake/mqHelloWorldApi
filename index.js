var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./ssl/mq.local.key', 'utf8');
var certificate = fs.readFileSync('./ssl/mq.local.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
const Express = require('express');
let cors = require('cors');
const SampleData = require('./data/SampleData');
let Data = new SampleData();
let reqCount = 0;

class Index
{
  constructor()
  {
    this.app = Express();
    this.app.use(cors());
    this.credentials = credentials;
    this.http = http;
    this.https = https;
    
    this.app.get('/hello', function (req, res) {
      res.json(Data);
      reqCount++;
      console.log(`request ${reqCount}`);
    });
    this.httpServer = http.createServer(this.app);
    this.httpsServer = this.https.createServer(this.credentials, this.app);

    this.httpServer.listen(8080);
    this.httpsServer.listen(443);
  }
}
const index = new Index();