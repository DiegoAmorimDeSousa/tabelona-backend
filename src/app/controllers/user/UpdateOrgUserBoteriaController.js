import UpdateOrgUser from '../../../services/UpdateOrgUserBoteria.service';

class UpdateOrgUserBoteriaController {
    async updateOrg(request, response) {

        const { userData, code, token } = request.body;

        let organizationId;

        if (userData !== undefined) {
            if (userData.boteria === undefined) {
                userData.integrations.map(element => {
                    if (element.name === 'boteria') {
                        organizationId = element.organizationId;
                    };
                })
            } else {
                organizationId = userData.boteria.organizationId;
            }
        }

        const updateOrgService = await UpdateOrgUser(code, organizationId, token);

        return response.status(200).json(updateOrgService);
    }
}

export default new UpdateOrgUserBoteriaController();