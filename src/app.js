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
