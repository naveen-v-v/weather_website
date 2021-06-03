# Real-time weather API
This application has Two phases
> Phase-One, we find the longitude and latitude from Mapbox API using the country name provided by a user

> Phase-Two, using these longitudes and latitudes we render the weather data from WeatherStack API

## API's and Modules used:
WeatherStack API (for weather data), Mapbox API(for longitude, latitude), node, express

## Basics
* get() lets us configure what the server should do when someone try to get the resource from the url.
* listen() used to start the server up, has 2-args port number and an optional arg a callback function.
* app.get('', (req, res) => {           // root domain is used as the url, arguement is ''
     
     res.send('')                       //can send-back html or json
  
  })
* render(hbs filename[path is not required as it uses views folder by default for hbs files]// render is used to render handlebars files.
