const fs = require('fs');
const path = require('path');

function countStudents(dbPath) {
  const full = path.resolve(dbPath);
  if (!fs.existsSync(full)) throw new Error('Cannot load the database');

  let content;
  try { content = fs.readFileSync(full, 'utf8'); }
  catch { throw new Error('Cannot load the database'); }

  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length <= 1) { console.log('Number of students: 0'); return; }

  const data = lines.slice(1);
  const groups = {};
  for (const row of data) {
    const parts = row.split(',');
    if (parts.length >= 4) {
      const firstname = parts[0].trim();
      const field = parts[3].trim();
      (groups[field] ||= []).push(firstname);
    }
  }

  const total = Object.values(groups).reduce((a, arr) => a + arr.length, 0);
  console.log(`Number of students: ${total}`);
  for (const [field, list] of Object.entries(groups)) {
    console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
  }
}

module.exports = countStudents;
