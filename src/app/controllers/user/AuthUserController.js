class AuthUserController {
  async auth(request, response) {
    try {
      return response.status(200).json({
        'result': 'success',
        'message': 'Token válido'
      });
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new AuthUserController();
