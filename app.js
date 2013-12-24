var koa = require('koa');
var route = require('koa-route');
var serve = require('koa-static');
var views = require('co-views');
var app = koa();

var render = views(__dirname + '/views', { map : {html : 'jade'}});

// GET /views => render template engine
app.use(route.get('/views', function *(next) {
  this.body = yield render('index.jade', {name: "koa"});
}));

// GET /hello => 'Hello!'
app.use(route.get('/hello', function *() {
  this.body = 'Hello!!';
}));

// GET /hello/:name => 'Hello :name'
app.use(route.get('/hello/:name', function *(name) {
  this.body = 'Hello ' + name;
}));


// static file serv
app.use(serve(__dirname + '/public'));

app.listen(3000);
