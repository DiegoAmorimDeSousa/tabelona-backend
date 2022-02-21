async function configTable(times){

    const timeArray = [];

    times.forEach(item => {
        item.classification.forEach(option => {
            if(option.year === 2021){
                timeArray.push({
                    name: item.name,
                    seriesType: item.seriesType,
                    pontuation: option.pontuation,
                    games: option.games,
                    wins: option.wins,
                    country: item.country,
                })
            }
        })
    });

    timeArray.sort(function (a, b) {
        if (a.pontuation > b.pontuation) {
            return -1;
        } else if(a.pontuation === b.pontuation) {
            if(a.games < b.games) {
                return -1;
            } else if(a.games === b.games){
                if(a.wins > b.wins){
                    return -1;
                } 
            }
        }
    });

    return timeArray;
    
}
  
export default configTable;