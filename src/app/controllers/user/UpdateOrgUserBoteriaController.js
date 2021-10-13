import UpdateOrgUser from '../../../services/UpdateOrgUserBoteria.service';

class UpdateOrgUserBoteriaController {
    async updateOrg(request, response) {

        const { userData, code, token } = request.body;

        let userId;

        if (userData !== undefined) {
            if (userData.boteria === undefined) {
                userData.integrations.map(element => {
                    if (element.name === 'boteria') {
                        userId = element.userIdBoteria;
                    };
                })
            } else {
                userId = userData.boteria.userIdBoteria;
            }
        }

        const updateOrgService = await UpdateOrgUser(code, userId, token);

        return response.status(200).json(updateOrgService);
    }
}

export default new UpdateOrgUserBoteriaController();