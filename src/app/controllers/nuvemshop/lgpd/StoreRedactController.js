import User from '../../../../models/user';

class StoreRedactController {
    async storeRedact(request, response) {

        const { userIdStore } = request.body;

        User.findOneAndUpdate(
            {
                userIdStore: userIdStore
            }
            ,
            { 'userIdStore': '', 'accessToken': '' }, { new: true })
            .then(result => console.log(result))
            .catch(err => console.log(err));

        return response.status(200).json({
            message: "success"
        })
    }
}

export default new StoreRedactController();