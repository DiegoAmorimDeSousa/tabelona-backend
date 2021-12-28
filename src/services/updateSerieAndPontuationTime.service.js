import Time from '../models/times';
import logger from '../utils/logger';

async function updateSerieAndPontuationTime(name, down, up, serie){

    let newSeriesType = serie;

    if(down) {
        console.log('ENTROU AQUI', name, down);
        if(serie === 'A'){
            newSeriesType = 'B';
        } else {
            newSeriesType = 'Sem série'
        }
    }

    if(up){
        newSeriesType = 'A'
    }

    // console.log({
    //     name,
    //     pontuation: 0,
    //     games: 0,
    //     wins: 0,
    //     year: Number(2022)}, {seriesType: newSeriesType})

    // Time.findOneAndUpdate({ name: name },
    //      { $push: { classification: {
    //         pontuation: 0,
    //         games: 0,
    //         wins: 0,
    //         year: Number(2022)
    //     }, }, 
    //        seriesType: newSeriesType
    //      }, 
    // { new: true })
    //     .then(resu => console.log(resu))
    //     .catch(err => console.log(err))

}
  
export default updateSerieAndPontuationTime;