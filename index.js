var express = require('express');
var path = require('path');

var app = express();

app.use('/resources', express.static('public'));

const controllers = {
    webproxy: require('./controllers/ctrlWebProxy.js')
}

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.get('/annotator', asyncMiddleware(async (req, res, next) => {
    if (req.query.requestType == "webproxy") {
        await controllers.webproxy.manageRequest(req, res);
    } else {
        res.send("Select a requestType");
    }
}));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});