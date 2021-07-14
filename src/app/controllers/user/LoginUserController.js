import loginService from '../../../services/login.service';

class LoginUserController {
  async login(request, response) {
    const { email, password, tokenReCaptcha } = request.body;

    const login = await loginService(email, password, tokenReCaptcha);

    return response.json(login);
  }
}

export default new LoginUserController();
