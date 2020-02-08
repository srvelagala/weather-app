const request = require('request')

const getWeather = ({latitude, longitude, location},callback) => {
    const url = 'https://api.darksky.net/forecast/2bdec1336520d3b40cc67869e03e580f/'+latitude+','+longitude+'?units=si'
    request({url , json: true}, (error, {body}) => {
    if(error){
        callback('Unable to reach service!!Try again!!')
    }else{
        callback(body.daily.data[0].summary +' It is currently '+ body.currently.temperature + ' degrees out in '+location+'. There is '+ body.currently.precipProbability + ' %'+
        ' chance of rain')
    }
    })
}

module.exports = {
    getWeather: getWeather
}