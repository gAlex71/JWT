const UserModel = require('../models/user.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service.js');
const tokenService = require('./token-service.js');
const UserDto = require('../dto/user-dto.js');
const ApiError = require('../exceptions/api-error.js');

class UserService {
	async registration(email, password) {
		const candidate = await UserModel.findOne({ where: { email } });
		if (candidate) {
			throw ApiError.BadRequest('Пользователь с таким email уже существует');
		}
		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink = uuid.v4();
		const user = await UserModel.create({ email, password: hashPassword, activationLink });
		await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

		//Все поля с user нам не нужны поэтому создаем dto
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		//Сохраняем refresh токен в базу
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	async activate(activationLink) {
		//Ищем пользователя в бд по этой ссылке
		const user = await UserModel.findOne({ where: { activationLink } });
		if(!user) {
			throw ApiError.BadRequest('Неккоректная сылка активации');
		}

		user.isActivated = true;
		await user.save();
	}

	async login(email, password) {
		const user = await UserModel.findOne({ where: { email } });
		if(!user) {
			throw ApiError.BadRequest('Пользователь с таким email не найден');
		}

		const isPassEquals = await bcrypt.compare(password, user.password);
		if(!isPassEquals) {
			throw ApiError.BadRequest('Неверный пароль')
		}

		//Все поля с user нам не нужны поэтому создаем dto
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		//Сохраняем refresh токен в базу
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}
}

module.exports = new UserService();
