const request = require('request')
const getcoordinates = (city,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(city)+'.json?access_token=pk.eyJ1IjoiaW1zcmluYXRoIiwiYSI6ImNrNjYzYjZxeDFjczMzbm1tazYyeHNhaXcifQ.u7W6xS_vZTmgT5Ka5TNXQw&limit=1'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Location service cannot be reached!!',undefined)
        }else if(body.error){
            callback('Could not find the Location!!',undefined)
        }else if(body.features.length === 0){
            callback('Try again with different search term!!',undefined)
        }else{
             const data= {
               longitude : body.features[0].center[0],
               latitude: body.features[0].center[1],
               location: body.features[0].place_name
            }
            callback(undefined,data)
        }    
    })
}

module.exports = {
    getcoordinates: getcoordinates
}