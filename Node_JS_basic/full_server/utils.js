const fs = require('fs');

function readDatabase(path) {
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
        // pas d'étudiants valides
        resolve({});
        return;
      }

      const groups = {}; // { CS: [firstnames], SWE: [firstnames] }
      const rows = lines.slice(1);
      for (const row of rows) {
        const parts = row.split(',');
        if (parts.length >= 4) {
          const firstname = parts[0].trim();
          const field = parts[3].trim();
          if (!groups[field]) groups[field] = [];
          groups[field].push(firstname);
        }
      }
      resolve(groups);
    });
  });
}

module.exports = readDatabase;
