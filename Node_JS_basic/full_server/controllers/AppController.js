class AppController {
  static getHomepage(req, res) {
    res.set('Content-Type', 'text/plain');
    res.status(200).send('Hello Holberton School!');
  }
}

module.exports = AppController;
