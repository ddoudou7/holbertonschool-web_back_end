const readDatabase = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    res.set('Content-Type', 'text/plain');
    const dbPath = process.argv[2];

    try {
      const map = await readDatabase(dbPath);

      // Construit le rapport au format attendu (comme la task 3)
      const fields = Object.keys(map).sort(); // alpha: CS puis SWE
      const total = fields.reduce((acc, k) => acc + map[k].length, 0);

      let report = `Number of students: ${total}`;
      for (const field of fields) {
        const list = map[field].join(', ');
        report += `\nNumber of students in ${field}: ${map[field].length}. List: ${list}`;
      }

      res.status(200).send(`This is the list of our students\n${report}`);
    } catch (err) {
      res.status(500).send('This is the list of our students\nCannot load the database');
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
      const map = await readDatabase(dbPath);
      const list = (map[major] || []).join(', ');
      res.status(200).send(`List: ${list}`);
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
