const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)  //  path to the directory this file is in.
// console.log(__filename) //  path to the file itself.
// console.log(path.join(__dirname,'../public')) //  join() used to join string and path.

const app = express()
const port = process.env.PORT || 3000  //heroku port || local port

// Paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)          //views directory path is set
hbs.registerPartials(partialsPath)  //Partials path set

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Nav'
    }) // render(hbs filename[path is not required as it uses only views folder for hbs files]// render is used to render handlebars files.
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Nav'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Nav'
    })
})

app.get('/weather', (req,res) => { // 4nd route
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search address'
        })
    }
    //geocode
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) =>{
        if(error){
            res.send({error})
        }else{
            forecast(latitude, longitude,(error, forecastData) => {
                if(error){
                    res.send({error})
                }
                else{
                    res.send({
                        forecast: forecastData,
                        location: location,
                        //latitude: latitude,
                        //longitude: longitude
                    })
                }
            })
        }

    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Nav',
        errormessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Nav',
        errormessage: 'Page not found'
    })
})

app.listen(port, ()=> {  
    console.log('Server is up on port 3000')
})
// Commented Details: Refer expressjs.com and nodejs.com

// get() lets us configure what the server should do when someone try to get the resource from the url.
// consider root domain app.com [assume we own it]  
// app.com/help
// app.com/about
// listen() used to start the server up, has 2-args port number and an optional arg a callback function.

// app.get('', (req, res) => { // root domain is used as the url arg is ''.
//     res.send('<h1> Weather </h1>')  //can send-back html or json
// })

// app.get('/help', (req,res) => { // 2nd route
//     res.send([
//         {name: 'Nav'},              // sending json data, express automatically stringifies the json data and send it to the web page.
//         {age: '20'}
//         ]        // json can be array or objects
//     )
// })

// app.get('/about', (req,res) => { // 3nd route
//     res.send('About page is Working...')
// })
