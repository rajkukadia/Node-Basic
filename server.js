const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public')); //absolute path //static approach


//This function is executed everytime an app receives a http request
app.use((req, res, next)=>{
    var now  =  new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', function(err) {
       if(err){
           console.log('Unable to append to server.log');
       }
       else{
           console.log('Logged succesfully');
       }
    });
console.log(log);
next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance/site-down.hbs', {
//         title: 'Site is down',
//     });
//
// });


app.get('/',(req, res)=>{
    res.render('home.hbs', {
       pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req, res)=> {

    res.render('about.hbs', {
    pageTitle: 'About Page',

}); //dynamic approach
});



hbs.registerHelper('currentYear', function(){
   return new Date().getFullYear();
});


hbs.registerHelper('scream', function(text){
    return text.toUpperCase();
});

app.get('/bad', (req, res) => {

    res.send({
        message: 'bad request',
        code: 'err111',
        error: 'error handling request'
    }) ;
});

app.get('/projects', (req, res)=>{
   res.render('projects.hbs', {
       message: 'My project',
       pageTitle: 'Projects'
   }) ;
});

app.listen(3000, function(){
    console.log("Server is listening for incoming requests!");
}); //Bind the application to a port
