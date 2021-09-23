import loginService from '../../../services/login.service';
import loginTokenService from '../../../services/loginToken.service';

class LoginUserController {
  async login(request, response) {
    const {
      email,
      password,
      tokenReCaptcha,
      tokenBoteria,
      origin,
      accessToken,
      code,
      userIdStore,
      refreshToken_rd } = request.body;

    if (tokenBoteria === undefined) {
      const login = await loginService(email, password, tokenReCaptcha, origin, accessToken, code, userIdStore, refreshToken_rd);

      return response.json(login);
    } else {
      const login = await loginTokenService(email, password, tokenBoteria);

      return response.json(login);
    }

  }
}

export default new LoginUserController();
