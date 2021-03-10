import userSchema from '../../../models/user';

class GetBotPublishController {
  async getPublish(request, response){
    try {

      const { email } = request.headers;

      const userEmail = await userSchema.find({email: email});

      const userBotPublish = userEmail[0].botPublish;

      return response.json(userBotPublish);
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new GetBotPublishController();
