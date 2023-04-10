const express=require("express")
const app=express();
const path = require('path');
const request = require('request');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/" , (req,res)=>{
    res.render("search")
})



app.get('/results', (req, res)=> {

    let query = req.query.search
    
    request(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=780f1610434b8f66a2fa41d668197414&units=metric`, (error, response ,  body) => {
        if(error) {
            console.log(error);
        }
        
        let data = JSON.parse(body);
      
        var weather={
            city : query,
            tempmin : Math.round(data.main.temp_min),
            tempmax :  Math.round(data.main.temp_max),
            temper : data.main.temp,
            country : data.sys.country,
            tempstatus : data.weather[0].main
        } 
        
        res.render('weather', {weather:weather});
        
    });

});

app.get("*" , (req,res)=>{
    res.send("404 error page")
})


app.listen(3000 , ()=>{
    console.log("listen");
})