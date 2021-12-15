import timeSchema from '../../models/times';

class updatePontuationController {
    async updatePontuationController(request, response){

        const { name, result, pontuation, games, position } = request.body;

        try {

            if(name !== 'name'){
                let point = 0;
                let win = 0;

                if(result === 'V'){
                    point = 3;
                    win = 1;
                }

                if(result === 'E'){
                    point = 1;
                }

                const date = new Date();

                const arrayFinaly = [];

                const timesClassification = await timeSchema.find({'name': name});

                const classificationArray = timesClassification[0].classification;

                let updateOn = false;

                classificationArray.map(element => {
                    if(element.year === date.getFullYear()){

                        if(result !== 'D'){
                            if(element.pontuation === pontuation){
                                updateOn = true;
                            }
                        } else {
                            if(element.games === games){
                                updateOn = true;
                            }
                        }

                        arrayFinaly.push({
                            pontuation: element.pontuation + point,
                            games: element.games + 1,
                            wins: element.wins + win,
                            year: date.getFullYear()
                        });

                    } else {
                        arrayFinaly.push({
                            pontuation: element.pontuation,
                            games: element.games,
                            win: element.win,
                            year: element.year
                        })
                    }
                });

                if(updateOn){
                    timeSchema.findOneAndUpdate({ name: name },
                        { classification: arrayFinaly, lastPosition: position }, { new: true })
                        .then(resu => console.log(resu))
                        .catch(err => console.log(err))
    
                    const times = await timeSchema.find({
                        'classification.year': 2021
                    }).sort({
                        'classification.pontuation': -1,
                        'classification.games': 1,
                        'classification.wins': -1,
                        'name': -1
                    })

                    return response.status(200).json({
                        success: true,
                        message: 'Times selecionados com sucesso',
                        times
                    });
                } else {
                    const times = await timeSchema.find({
                        'classification.year': 2021
                    }).sort({
                        'classification.pontuation': -1,
                        'classification.games': 1,
                        'classification.wins': -1,
                        'name': -1
                    })
        
                    return response.status(200).json({
                        success: true,
                        message: 'Times selecionados com sucesso',
                        times
                    });
                }
                
            } else {
                const times = await timeSchema.find({
                    'classification.year': 2021
                }).sort({
                    'classification.pontuation': -1,
                    'classification.games': 1,
                    'classification.wins': -1,
                    'name': -1
                })
    
                return response.status(200).json({
                    success: true,
                    message: 'Times selecionados com sucesso',
                    times
                });
            }
        } catch (error) {
            return response.status(400).json({
                success: false,
                message: 'Erro ao selecionar os times'
            });
        }
    }
}

export default new updatePontuationController();