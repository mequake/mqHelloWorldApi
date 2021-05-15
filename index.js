const SampleData = require('./data/SampleData');
const Express = require('express');
let cors = require('cors');
let reqCount = 0;

class Index
{
  constructor()
  {
    this.app = Express();
    this.app.use(cors());
    
    this.app.get('/hello', function (req, res) {
      res.json(new SampleData());
      reqCount++;
      console.log(`request ${reqCount}`);
    });
    this.app.listen(3050);
  }
}

const index = new Index();