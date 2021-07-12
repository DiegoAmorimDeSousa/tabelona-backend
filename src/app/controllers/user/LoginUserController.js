import loginService from '../../../services/login.service';

class LoginUserController {
  async login(request, response) {
    const { email, password, tokenReCaptcha } = request.body;

    loginService(email, password, tokenReCaptcha, response);
  }
}

export default new LoginUserController();
