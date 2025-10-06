# Real-time weather API

### Check out the Medium Post for details about the application

> 'https://medium.com/@naveen-varma/real-time-weather-data-using-nodejs-and-external-weather-apis-ae3e65ca48c9'

### Experienc the app live
- Hosted on Render, Render takes few seconds to load the app, once requested, as it is a free version
- https://weather-website-xujq.onrender.com

[Made use of "Render" website for deploying the application]
> Output:
<img width="1440" alt="Screenshot 2022-12-14 at 9 34 14 PM" src="https://user-images.githubusercontent.com/115595566/207758950-5f927d13-33a9-41bf-9be7-a8f2ab5ca296.png">

### API’s and Modules used:

- WeatherStack API (for weather data), Mapbox API(for longitude, latitude), node, express. Refer the npmjs documentation for details about modules used.

### What you need:

- To complete this applicatin we need API’s from WeatherStack API (for weather data) and Mapbox API. Sign up to these of any other external API sites for free, you will get an access key for your account, use the access Keys in the url requests in files “forecast.js” and “geocode.js”.

### This application has Two phases

- Phase-One: we find the longitude and latitude from “Mapbox API” using the country name provided by a user.
- Phase-Two: using the longitudes and latitudes from phase-One we render the weather data from “WeatherStack API”.

### Details of Methods used

- get() lets us configure what the server should do when someone try to get the resource from the url.
- listen() used to start the server up, has 2-args port number and an optional arg a callback function.
- app.get(‘’, (req, res) => { // root domain is used as the url, arguement is ‘’res.send(‘’) //can send-back html or json})
- render(hbs filename[path is not required as it uses views folder by default for hbs files] // render is used to render handlebars files.
