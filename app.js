const {parse} = require('csv-parse');
const fs = require('fs');

const results = [];

function habitablePlanets(planet){
    return planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6 ;
}
fs.createReadStream('KeplerData.csv')
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        if(habitablePlanets(data)){
        results.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        var number = results.length;
       console.log(number + ' habitable planets found !!')
       console.log(results.map((planet) => {
        return planet['kepler_name']
       }))
    });


//habitability: koi_disposition and Stellar FLux (koi_insol) and Planetary radius (koi_prad)