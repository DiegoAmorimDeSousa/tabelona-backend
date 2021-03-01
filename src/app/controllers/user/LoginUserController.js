import loginService from '../../../services/login.service';

class LoginUserController {
  async login(request, response) {
    const { email, password } = request.body;

    loginService(email, password, response);
  }
}

export default new LoginUserController();
