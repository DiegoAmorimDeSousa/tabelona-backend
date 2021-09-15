import User from '../../../models/user';

class CloseInitialGifController {
  async close(request, response) {
    try {
      const { email } = request.body;

      User.findOneAndUpdate({ email: email }, { 'closeInitialGif': true }, { new: true })

    } catch (error) {
      return response.json(error);
    }
  }
}

export default new CloseInitialGifController();
