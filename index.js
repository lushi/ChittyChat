var app = require('express')()
var bodyParser = require('body-parser');

var messages = [];
var id = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
  res.sendfile('index.html');
})

app.get('/chat', function(req, res) {
  res.json(messages);
})

app.post('/chat', function(req, res) {
  messages.push({
    id: id++,
    from: req.body.from,
    to: req.param('to'),
    content: req.param('content'),
    c_time: Date.now()
  });
  res.json(req.body);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
