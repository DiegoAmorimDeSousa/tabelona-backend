import timeSchema from '../../models/times';

class getTimesController {
    async getTimes(request, response){

        try {

            const { year } = request.params;

            let times = '';
            
            if(year === 'undefined'){
                times = await timeSchema.find({
                    'classification.year': Number(new Date().getFullYear())
                }).sort({
                    'titles.year': -1,
                });
            } else {
                times = await timeSchema.find().sort({
                    'classification.pontuation': -1,
                    'classification.games': 1,
                    'classification.wins': -1,
                    'name': -1
                });
            }

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