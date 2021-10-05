import User from '../../../models/user';
import logger from '../../../utils/logger';

class UpdateValueRDController {
  async updateValueRD(request, response) {
    const { userData } = request.body;

    let count = 0;

    userData.integrations.map(async (element) => {
      if(element.name === 'rd'){
        if(count === 0){
          count = count + 1;
          await User.updateOne({ email: userData.email, "integrations.name": 'rd' },
          { $set: {
            "integrations.$.redirectValue" : 1,
          } }
          )
          .then(() => {logger.info('Updated redirect value user')})
          .catch(() => {logger.error('Error updating redirect value user')});
        }

      }
    })

    return response.json(value);
  }
}

export default new UpdateValueRDController();
