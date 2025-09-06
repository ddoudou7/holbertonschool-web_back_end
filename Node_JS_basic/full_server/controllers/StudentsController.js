const readDatabase = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    res.set('Content-Type', 'text/plain');
    const dbPath = process.argv[2];

    try {
      const groups = await readDatabase(dbPath);
      const lines = ['This is the list of our students'];

      // clés triées alphabétiquement (case-insensitive)
      const fields = Object.keys(groups).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      );

      for (const field of fields) {
        const list = groups[field] || [];
        lines.push(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
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
