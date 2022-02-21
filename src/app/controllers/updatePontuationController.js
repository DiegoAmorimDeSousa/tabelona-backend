import timeSchema from '../../models/times';

class updatePontuationController {
    async updatePontuationController(request, response){

        const { name, result } = request.body;

        let point = 0;
        let wins = 0;

        if(result === 'V'){
            point = 3;
            wins = 1;
        }

        if(result === 'E'){
            point = 1;
        }

        const arrayFinaly = [];

        const timesClassification = await timeSchema.find({'name': name});

        const classificationArray = timesClassification[0].classification;

        classificationArray.map(element => {
            if(element.year === new Date().getFullYear()){
                arrayFinaly.push({
                    pontuation: element.pontuation + point,
                    games: element.games + 1,
                    wins: element.wins + wins,
                    year: new Date().getFullYear()
                });
            } else {
                arrayFinaly.push({
                    pontuation: element.pontuation,
                    games: element.games,
                    wins: element.wins,
                    year: element.year
                })
            }
        });

        await timeSchema.findOneAndUpdate({ name: name },
            { classification: arrayFinaly }, { new: true })
            .then(resu => console.log('Time atualizado'))
            .catch(err => console.log(err))

        const times = await timeSchema.find().sort({'name': 1})

        return response.status(200).json({
            success: true,
            message: 'Times selecionados com sucesso',
            times
        });
    }
}

export default new updatePontuationController();