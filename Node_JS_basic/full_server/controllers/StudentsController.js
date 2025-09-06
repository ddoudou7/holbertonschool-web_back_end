const readDatabase = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    res.set('Content-Type', 'text/plain');
    const dbPath = process.argv[2];

    try {
      const groups = await readDatabase(dbPath);

      // Tri des clés A->Z, insensible à la casse (CS avant SWE)
      const fields = Object.keys(groups).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      );

      // Total = somme des tailles de chaque tableau
      const total = fields.reduce((acc, f) => acc + (groups[f]?.length || 0), 0);

      // EXACTEMENT le format attendu
      const lines = ['This is the list of our students', `Number of students: ${total}`];

      for (const field of fields) {
        const list = groups[field] || [];
        lines.push(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }

      res.status(200).send(lines.join('\n'));
    } catch (err) {
      // Pour Task 8, en cas d’erreur: 500 + message d’erreur seul
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
