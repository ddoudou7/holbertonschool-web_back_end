const readDatabase = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    const dbPath = process.argv[2];

    try {
      const fieldsMap = await readDatabase(dbPath); // { CS: [...], SWE: [...] }
      const order = ['CS', 'SWE'];

      // total = somme des longueurs
      const total = order.reduce((acc, k) => acc + (fieldsMap[k]?.length || 0), 0);

      let report = 'This is the list of our students';
      report += `\nNumber of students: ${total}`;
      for (const field of order) {
        const list = fieldsMap[field] || [];
        report += `\nNumber of students in ${field}: ${list.length}. List: ${list.join(', ')}`;
      }

      res.status(200).set('Content-Type', 'text/plain').send(report);
    } catch (err) {
      res.status(500).set('Content-Type', 'text/plain').send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const dbPath = process.argv[2];
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).set('Content-Type', 'text/plain').send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const fieldsMap = await readDatabase(dbPath);
      const list = fieldsMap[major] || [];
      res.status(200).set('Content-Type', 'text/plain').send(`List: ${list.join(', ')}`);
    } catch (err) {
      res.status(500).set('Content-Type', 'text/plain').send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
