const http = require('http');
const fs = require('fs');

function buildReport(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, raw) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = raw.toString().trim().split('\n');
      const rows = lines.slice(1).filter((l) => l.trim().length > 0);

      const groups = {};
      for (const row of rows) {
        const [firstname, , , field] = row.split(',');
        if (!groups[field]) groups[field] = [];
        groups[field].push(firstname);
      }

      const parts = [];
      parts.push(`Number of students: ${rows.length}`);
      for (const field of Object.keys(groups).sort()) {
        const list = groups[field];
        parts.push(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }
      resolve(parts.join('\n'));
    });
  });
}

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
    return;
  }

  if (req.url === '/students') {
    res.statusCode = 200;
    res.write('This is the list of our students\n');
    buildReport(process.argv[2])
      .then((report) => res.end(report))
      .catch(() => res.end('Cannot load the database'));
    return;
  }

  res.statusCode = 404;
  res.end();
});

app.listen(1245);

module.exports = app;
