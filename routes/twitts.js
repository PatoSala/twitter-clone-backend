let express = require('express');
let router = express.Router();
let twittsController = require('../controllers/twittsController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', twittsController.store);

router.post('/delete', twittsController.delete);

router.post('/like', twittsController.like);

router.post('/unlike', twittsController.unlike);

router.get('/list', twittsController.list);

router.get('/:twittId', twittsController.getTwittById);

router.get('/u/:userId', twittsController.getUserTwitts)

module.exports = router;