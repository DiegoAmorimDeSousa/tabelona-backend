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

        return response.status(200).json({
            message: "success"
        })
    }
}

export default new StoreRedactController();