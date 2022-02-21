import timeSchema from '../../models/times';
import logger from '../../utils/logger';

class ChangeScoreTimeController {
    async changeScoreTime(request, response){
        try {
            const { time, score, objSwitching, torney } = request.body;

            let newArraySwitching = [];

            await objSwitching.map(element => {
                if(element.name === torney){
                    newArraySwitching.push({
                        name: torney,
                        moment: element.moment,
                        score: score
                    });
                } else {
                    newArraySwitching.push(element);
                }
            });

            timeSchema.findOneAndUpdate({ name: time },
                { switching: newArraySwitching }, { new: true })
                .then(() => logger.info(`Score atualizado para ${time}`))
                .catch(() => logger.error(`Erro ao atualizar score para ${time}`))

            return response.status(200).json('success');
            
        } catch (error) {
            return response.status(400).json(error);
        }
    }
}

export default new ChangeScoreTimeController();