import listBotService from '../../../services/listBot.service';

class ListBotController {
  async list(request, response) {
    try {

      const { token } = request.headers;

      const listBot = await listBotService(token);

      return response.json({ result: listBot });
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new ListBotController();
