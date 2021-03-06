import timeSchema from '../../models/times';

class getTimesController {
    async getTimes(request, response){

        try {
            
            const times = await timeSchema.find().sort({'name': 1});

            return response.status(200).json({
                success: true,
                message: 'Times selecionados com sucesso',
                times
            });
        } catch (error) {
            return response.status(400).json({
                success: false,
                message: 'Erro ao selecionar os times'
            });
        }
    }
}

export default new getTimesController();