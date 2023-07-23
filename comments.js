// Create web server
// 1. Create a web server that can listen to requests for /hello and respond with some HTML that says <h1>Hello World!</h1>
// 2. Add /hello/NAME, where NAME is any string, to respond with HTML that says <h1>Hello NAME!</h1>
// 3. Add /hello?name=NAME, where NAME is any string, to respond with JSON that says {message: "Hello NAME!"}
// 4. Add /op?op=ADD&n1=XX&n2=YY, where XX and YY are integers, to respond with JSON that says {result: XX+YY}
// 5. Add /time to respond with JSON that has a single property: {time: "now"} where "now" is the current date/time in ISO format: (new Date()).toISOString()

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const urlObj = url.parse(req.url);
  const queryObj = querystring.parse(urlObj.query);

  if (urlObj.pathname === '/hello') {
    if (queryObj.name) {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({message: `Hello ${queryObj.name}!`}));
      res.end();
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.write('<h1>Hello World!</h1>');
      res.end();
    }
  } else if (urlObj.pathname === '/op') {
    const op = queryObj.op;
    const n1 = parseInt(queryObj.n1);
    const n2 = parseInt(queryObj.n2);

    if (op === 'ADD') {
      const result = n1 + n2;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({result}));
      res.end();
    } else {
      res.statusCode = 400;
      res.write('Bad Request');
      res.end();
    }
  } else if (urlObj.pathname === '/time') {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({time: (new Date()).toISOString()}));
    res.end();
  } else {
    res.statusCode = 404;
    res.write('Not Found');}});
