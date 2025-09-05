const readDatabase = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    res.set('Content-Type', 'text/plain');
    const dbPath = process.argv[2];

    try {
      const groups = await readDatabase(dbPath);
      const cs = groups.CS || [];
      const swe = groups.SWE || [];
      const total = cs.length + swe.length;

      const lines = [
        'This is the list of our students',
        `Number of students: ${total}`,
        `Number of students in CS: ${cs.length}. List: ${cs.join(', ')}`,
        `Number of students in SWE: ${swe.length}. List: ${swe.join(', ')}`,
      ];

      res.status(200).send(lines.join('\n'));
    } catch (err) {
      // Fix pour Check 3
      res.status(500).send(
        ['This is the list of our students', 'Cannot load the database'].join('\n')
      );
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
