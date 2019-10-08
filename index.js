var express = require('express');
var path = require('path');

const PORT = process.env.PORT || 3000

var app = express();

app.enable('trust proxy');
app.use(express.json());
app.use('/resources', express.static('public'));

const controllers = {
    webproxy: require('./controllers/ctrlWebProxy.js'),
    annotations: require('./controllers/ctrlAnnotations.js'),
}

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});
app.get('/ui', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/index_ui.html'));
});

app.get('/annotator', asyncMiddleware(async (req, res, next) => {
    if (req.query.requestType == "webproxy") {
        await controllers.webproxy.manageRequest(req, res);
    } else {
        res.send("Select a requestType");
    }
}));

app.get('/api/search', controllers.annotations.ctrlSearchAnnotationsGET)
app.get('/api/annotations', controllers.annotations.ctrlAnnotationsGET)
app.get('/api/annotations/:id', controllers.annotations.ctrlAnnotationGET)
app.post('/api/annotations', controllers.annotations.ctrlAnnotationPOST)
app.delete('/api/annotations/:id', controllers.annotations.ctrlAnnotationDELETE)


app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
});