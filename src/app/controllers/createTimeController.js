import createTimeService from '../../services/createTime.service';

class createTimeController {
    async createTime(request, response){
        try {
            const { time } = request.body;

            const timeSave = {
                name: time.name,
                state: time.state,
                seriesType: 'A',
                country: time.country,
                logo: time.logo,
                titles: [],
                initials: '',
                surname: time.surname,
                switching: [],
                lastPosition: 4,
                classification: [{
                    pontuation: 124,
                    games: 74,
                    wins: 55,
                    year: 2021
                }]
            }

            await createTimeService(timeSave);

            return response.status(200).json({
                success: true,
                message: 'Time cadastrado com sucesso'
            });
        } catch (error) {
            return response.status(400).json({
                success: false,
                message: 'Erro ao cadastrar o time'
            });
        }
    }
}

export default new createTimeController();