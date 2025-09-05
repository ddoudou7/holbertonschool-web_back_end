const express = require('express');
const fs = require('fs');

function countStudents(path) {
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

      // enleve l'en-tête
      lines.shift();

      const fields = {};
      for (const row of lines) {
        const parts = row.split(',');
        if (parts.length >= 4) {
          const firstname = parts[0].trim();
          const field = parts[3].trim();
          if (!fields[field]) fields[field] = [];
          fields[field].push(firstname);
        }
      }

      const total = Object.values(fields)
        .reduce((acc, arr) => acc + arr.length, 0);

      let report = `Number of students: ${total}`;
      for (const [field, list] of Object.entries(fields)) {
        report += `\nNumber of students in ${field}: ${list.length}. List: ${list.join(', ')}`;
      }
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

  countStudents(dbPath)
    .then((report) => {
      res.status(200).send(`This is the list of our students\n${report}`);
    })
    .catch((err) => {
      // Pour cette task: on renvoie le texte d’erreur après l’intro
      res.status(200).send(`This is the list of our students\n${err.message}`);
    });
});

app.listen(1245);

module.exports = app;
