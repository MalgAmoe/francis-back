const express = require('express');
const fs = require('fs');
const cors = require('cors');
const mm = require('music-metadata');

const rateLimiter = require('./middlewares/limiter');

const app = express();
app.disable('x-powered-by')
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(rateLimiter);

const dirPath = './files';
const files = fs.readdirSync(dirPath).map(file => file);
let titles = [];

(async () => {
  for (file of files) {
    const {common} = await mm.parseFile(`${dirPath}/${file}`);
    const { title } = common;
    titles.push(title);
  }
}
)();

app.get('/songs', (req, res) => {
  res.send(titles);
});

app.get('/song/:id', (req, res) => {
  const { params } = req;
  const { id } = params;
  const filePath = './files/' + files[id];
  const stat = fs.statSync(filePath);
  const total = stat.size;

  if (req.headers.range) {
    const range = req.headers.range;
    const parts = range.replace(/bytes=/, "").split("-");
    const partialstart = parts[0];
    const partialend = parts[1];

    const start = parseInt(partialstart, 10);
    const end = partialend ? parseInt(partialend, 10) : total - 1;
    const chunkSize = (end - start) + 1;
    let readStream = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': `bytes`, 'Content-Length': chunkSize,
      'Content-Type': 'video/mp4'
    });
    readStream.pipe(res);
  } else {
    console.log(req);
    res.writeHead(200, {
      'Content-Length': total,
      'Content-Type': 'audio/mpeg'
    });
    fs.createReadStream(filePath).pipe(res);
    console.log(res)
  }
});

app.listen(4500, () => {
  console.log('listening');
})