const request = require("request")

// WeatherStack API getting the weather details by using the latitude and longitude of a location.

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=528d6ba50fa1e10dae8e97254dabdce2&query="+latitude+','+longitude+"&units=f"
    
    // using es-6 short-hand syntax:
    request({url, json: true}, (error, {body})=>{
        if(error){                       //runs when network issue occurs
            callback("Unable to connect to Weather service!", undefined)
        }else if(body.error){   //runs when the data is insufficient or wrong
            callback("Unable to find the location, Try another search", undefined);
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + ".It is currently " + body.current.temperature + " degrees out.It feels like " + body.current.feelslike + " degrees out.The humidity is "+body.current.humidity)
        }
    })

    // Basic Syntax
    // request({url: url, json: true}, (error, response)=>{
    //     if(error){                       //runs when network issue occurs
    //         callback("Unable to connect to Weather service!", undefined)
    //     }else if(response.body.error){   //runs when the data is insufficient or wrong
    //         callback("Unable to find the location, Try another search", undefined);
    //     }
    //     else{
    //         callback(undefined, response.body.current.weather_descriptions[0] + ".It is currently " + response.body.current.temperature + " degrees out.It feels like " + response.body.current.feelslike + " degrees out")
    //     }
    // })
}

module.exports = forecast
