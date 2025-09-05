const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, raw) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = raw.toString().trim().split('\n');
      const rows = lines.slice(1).filter((l) => l.trim().length > 0);

      console.log(`Number of students: ${rows.length}`);

      const groups = {};
      for (const row of rows) {
        const [firstname, , , field] = row.split(',');
        if (!groups[field]) groups[field] = [];
        groups[field].push(firstname);
      }

      for (const field of Object.keys(groups).sort()) {
        const list = groups[field];
        console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }

      resolve();
    });
  });
}

module.exports = countStudents;
