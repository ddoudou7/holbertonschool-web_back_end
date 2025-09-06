const readDatabase = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    res.set('Content-Type', 'text/plain');
    const dbPath = process.argv[2];

    try {
      const groups = await readDatabase(dbPath);

      // Trier les clés de filière A→Z (insensible à la casse)
      const fields = Object.keys(groups)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

      // Format EXACT attendu (PAS de ligne "Number of students: ...")
      const lines = ['This is the list of our students'];

      for (const f of fields) {
        const listArr = groups[f] || [];
        const list = listArr.join(', ');
        lines.push(`Number of students in ${f}: ${listArr.length}. List: ${list}`);
      }

      res.status(200).send(lines.join('\n'));
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    res.set('Content-Type', 'text/plain');
    const dbPath = process.argv[2];
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const groups = await readDatabase(dbPath);
      const list = (groups[major] || []).join(', ');
      res.status(200).send(`List: ${list}`);
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
