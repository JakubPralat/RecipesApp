var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var port = 3000;

var recipes = require('./server/routes/recipes');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', recipes);

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  })

app.listen(port, function(){
    console.log('Server started on port' + port);
});