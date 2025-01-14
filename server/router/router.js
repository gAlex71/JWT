const Router = require('express').Router;
const { registration, login, logout, activate, refresh, getUsers } = require('../controllers/user-controller');
const router = new Router();
const { body } = require('express-validator');

//Добавляем middlewares для валидации тела запроса
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 4, max: 32 }),
    registration
);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refresh);
router.get('/activate/:link', activate);
router.get('/users', getUsers);

module.exports = router;
