const userService = require('../service/user-service');

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            //Так же сохраняем refresh токен в куки
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (error) {
            //Попадаем в middleware с обработкой ошибок
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async activate(req, res, next) {
        try {
            //Забираем динамический параметр ссылки
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            //Перенаправляем пользователя на сайт
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(['1', '2', '3', '4', '5'])
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();