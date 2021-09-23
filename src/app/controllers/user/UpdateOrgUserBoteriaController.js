import UpdateOrgUser from '../../../services/UpdateOrgUserBoteria.service';

class UpdateOrgUserBoteriaController {
    async updateOrg(request, response) {

        const { organizationId, code, token } = request.body;

        const updateOrgService = await UpdateOrgUser(code, organizationId, token);

        return response.status(200).json(updateOrgService);
    }
}

export default new UpdateOrgUserBoteriaController();