const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.post);
router.get('/', userController.userList);
router.delete('/:id', userController.deleteById);

module.exports = router;