import User from '../../../models/user';

class userDataController {
    async getUser(request, response) {
        const { email } = request.headers;

        const userData = await User.findOne({ email: email })
            .then(result => {
                return result;
            })
            .catch(() => { });

        return response.json(userData);
    }
}

export default new userDataController();