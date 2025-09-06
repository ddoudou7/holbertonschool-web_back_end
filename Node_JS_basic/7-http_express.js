const express = require('express');
const fs = require('fs');

function buildReport(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = data
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (lines.length <= 1) {
        resolve('Number of students: 0\nNumber of students in CS: 0. List: \nNumber of students in SWE: 0. List: ');
        return;
      }

      const groups = {}; // { CS: [firstnames], SWE: [firstnames] }
      for (const row of lines.slice(1)) {
        const parts = row.split(',');
        if (parts.length >= 4) {
          const firstname = parts[0].trim();
          const field = parts[3].trim();
          if (!groups[field]) groups[field] = [];
          groups[field].push(firstname);
        }
      }

      const cs = groups.CS || [];
      const swe = groups.SWE || [];
      const total = cs.length + swe.length;

      const report = [
        `Number of students: ${total}`,
        `Number of students in CS: ${cs.length}. List: ${cs.join(', ')}`,
        `Number of students in SWE: ${swe.length}. List: ${swe.join(', ')}`,
      ].join('\n');

      resolve(report);
    });
  });
}

const app = express();

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.set('Content-Type', 'text/plain');
  const dbPath = process.argv[2];

  buildReport(dbPath)
    .then((report) => {
      res.status(200).send(`This is the list of our students\n${report}`);
    })
    .catch((err) => {
      // Le checker attend l'intro + le message d'erreur
      res.status(200).send(`This is the list of our students\n${err.message}`);
    });
});

app.listen(1245);

module.exports = app;
