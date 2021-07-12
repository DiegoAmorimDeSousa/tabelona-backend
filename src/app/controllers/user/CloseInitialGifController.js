import User from '../../../models/user';

class CloseInitialGifController {
  async close(request, response) {
    try {
      const { email } = request.body;

      User.findOneAndUpdate({email: email},{'closeInitialGif': true}, { new: true })
      .then(response => console.log(response))
      .catch(err => console.log(err));

      console.log(email);
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new CloseInitialGifController();
