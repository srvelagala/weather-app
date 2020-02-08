const path = require('path')
const request = require('request')
const coordinates = require('./coordinates')
const weather = require('./weather')
const express = require('express')
const hbs = require('hbs')

const app = express()

const publicDirectory = path.join(__dirname,'../public');
const viewDirectory = path.join(__dirname,'../templates/views')
const partialDirectory = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewDirectory)
hbs.registerPartials(partialDirectory)
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render("index",{
        title: 'Weather App'
    })
})

app.get('/help',(req,res)=>{
    res.render("help",{
        title: 'Help'
    })
})

app.get('/help/*',(req,res)=>{
    res.send("Help Doc not found!!")
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title: 'About Us'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.city){
        res.send("Please enter the city and try again!!")
    }else{
    coordinates.getcoordinates(req.query.city,(error,{latitude, longitude, location} = {})=>{
        if({latitude, location, location}){
            weather.getWeather({latitude, longitude, location},(data) => res.send(JSON.stringify(data)))
        }else{
            res.send(error)
        }
        })
    }
})

app.get('*',(req,res)=>{
    res.render("error",{
      title: "404 Not Found"  
    })
})


app.listen(3000, ()=>{
    console.log("Server running!!")
})

// var city = process.argv[2]

// if(city){
// coordinates.getcoordinates(city,(error,{latitude, longitude, location})=>{
// if({latitude, location, location}){
//     weather.getWeather({latitude, longitude, location},(data) => console.log(data))
// }else{
//     console.log(error)
// }
// })
// }else{
//     console.log("Please provide the address!!")
// }