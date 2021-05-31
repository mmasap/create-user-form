const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const ejs = require('ejs');

const indexHtml = fs.readFileSync('./template/index.html', 'utf8');
const createUserEjs = fs.readFileSync('./template/create-user.ejs', 'utf8');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(indexHtml);
    res.end();
    return;
  }

  if (req.url === '/create-user' && req.method === 'POST') {
    let data = '';
    req
      .on('data', (chunk) => {
        data += chunk;
      })
      .on('end', () => {
        const parseData = qs.parse(data);
        const content = ejs.render(createUserEjs, {
          name: parseData.name,
          age: parseData.age,
        });
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(content);
        res.end();
      });
    return;
  }

  res.writeHead(302, { Location: '/' });
  res.end();
});
server.listen(3000);

const redirectIndex = (req, res) => {};
