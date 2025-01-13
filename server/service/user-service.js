const UserModel = require('../models/user.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service.js');
const tokenService = require('./token-service.js');
const UserDto = require('../dto/user-dto.js');

class UserService {
	async registration(email, password) {
		const candidate = await UserModel.findOne({ where: { email } });
		if (candidate) {
			throw new Error('Пользователь с таким email уже существует');
		}
		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink = uuid.v4();
		const user = await UserModel.create({ email, password: hashPassword, activationLink });
		await mailService.sendActivationMail(email, activationLink);

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
