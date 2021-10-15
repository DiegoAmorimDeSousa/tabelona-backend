import amountMessagesService from '../../../services/amountMessages.service';

class AmountMessagesController {
    async amountMessages(request, response){
        const { id } = request.params;

        const amountMessages = await amountMessagesService(id);

        return response.status(200).json(amountMessages);
    }
}

export default new AmountMessagesController();