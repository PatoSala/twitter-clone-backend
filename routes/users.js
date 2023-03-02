let express = require('express');
let router = express.Router();
let usersController = require('../controllers/usersController');


router.post('/register', usersController.store);

router.post('/login', usersController.login);

router.post('/delete', usersController.delete);

router.get('/list', usersController.list);

router.get('/:userId', usersController.getUserById);

module.exports = router;