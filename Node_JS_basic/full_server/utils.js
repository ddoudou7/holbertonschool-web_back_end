const fs = require('fs');

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = String(data)
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (lines.length <= 1) {
        resolve({});
        return;
      }

      const body = lines.slice(1);
      const map = {}; // { CS: [firstnames], SWE: [firstnames] }

      for (const row of body) {
        const parts = row.split(',');
        if (parts.length >= 4) {
          const firstname = parts[0].trim();
          const field = parts[3].trim();
          if (!map[field]) map[field] = [];
          map[field].push(firstname);
        }
      }

      resolve(map);
    });
  });
}

module.exports = readDatabase;
