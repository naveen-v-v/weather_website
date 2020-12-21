const request = require('request')

// Mapbox API getting Latitude and Longitude for using them in accessing weather data of a location.

const geocode = (address, callback) => {    //encodeURIComponent() func returns a string by decoding the address, even the special characters.
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoibmF2ZWVudmFybWEiLCJhIjoiY2toZXZ3Y24wMHl0MzJwbjFyZXZxdXJ1YyJ9.6yvZwiZHusH8QUrS0-rCOQ&limit=1"

    // using es-6 short-hand syntax:
    request({url, json:true}, (error, {body}) => {
        if(error){                          //runs when network issue occurs
            callback("Unable to connect to Geocode service!",undefined)
        }else if(body.message || body.features[0] == undefined){    //runs when the data is insufficient or wrong
           callback("Unable to find the location,Try another search.",undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })

    //Basic syntax
    // request({url: url, json:true}, (error, response) => {
    //     if(error){                          //runs when network issue occurs
    //         callback("Unable to connect to Geocode service!",undefined)
    //     }else if(response.body.message){    //runs when the data is insufficient or wrong
    //         callback("Unable to find the location,Try another search.",undefined)
    //     }else{
    //         callback(undefined,{
    //             latitude:response.body.features[0].center[1],
    //             longitude:response.body.features[0].center[0],
    //             location:response.body.features[0].place_name
    //         })
    //     }
    // })
}

module.exports = geocode
