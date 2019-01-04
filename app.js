const express = require("express");
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/barber/text', (req, res, next)=>{
  const textData = require('./json/textData.json');
  res.send(textData);
});

app.get('/barber/images/:image', (req, res, next) => {
  const options = {
    root: __dirname + '/images/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  res.sendFile(req.params.image, options, err => {
    if(err){
      next(err);
    } else {
      console.log('Sent:', req.params.image)
    }
  })
});

app.listen(8000, () => console.log('app listening on port 8000'));