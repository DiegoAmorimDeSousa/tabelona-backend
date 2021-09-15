import User from '../../../models/user';

class GetInitialGifController {
  async getGif(request, response) {
    try {
      const { email } = request.headers;

      let closeInitialGif;

      await User.findOne({ email: email })
        .then(response => {
          closeInitialGif = response.closeInitialGif;
        });

      return response.status(200).json(closeInitialGif);
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new GetInitialGifController();
