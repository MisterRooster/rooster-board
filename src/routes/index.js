var express = require('express');
var router = express.Router();

const messages = [
  {
    user: "Amando",
    text: "Hi there!",
    added: new Date()
  },
  {
    user: "Charles",
    text: "Hello World!",
    added: new Date()
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rooster Board', messages: messages });
});

/* GET users listing. */
router.get('/new', function(req, res, next) {
  res.render('new_message', { title: 'Rooster Board | New Message' });
});

router.post('/new', function(req, res, next) {
  const userName = req.body.messageUser;
  const message = req.body.messageText;

  messages.push({ user: userName,text: message, added: new Date() });
  res.redirect('/');
});

module.exports = router;
