const fs = require('fs');

function countStudents(path) {
  try {
    const raw = fs.readFileSync(path, 'utf8');
    const lines = raw.toString().trim().split('\n'); // en-tête + données

    // retire l'en-tête et les lignes vides éventuelles
    const rows = lines.slice(1).filter((l) => l.trim().length > 0);

    console.log(`Number of students: ${rows.length}`);

    const groups = {}; // { field: [firstnames] }
    for (const row of rows) {
      const [firstname, , , field] = row.split(',');
      if (!groups[field]) groups[field] = [];
      groups[field].push(firstname);
    }

    // ordre stable et déterministe (utile pour le checker)
    for (const field of Object.keys(groups).sort()) {
      const list = groups[field];
      console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
    }
  } catch (e) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
