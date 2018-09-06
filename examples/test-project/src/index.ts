import * as http from 'http';

function handler(req: http.IncomingMessage, res: http.OutgoingMessage) {
  console.log('request:', req.url);

  res.write('request: ' + req.url);
  res.end();
}

const port = 8088;

http.createServer(handler).listen(port, () => {
  console.log('server started at:', port);
});
