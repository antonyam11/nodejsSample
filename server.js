const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const { response } = require('express');

//if process.env.PORT is set, use that. if not, then use 7000
var port = process.env.PORT || 7000;

const server = app.listen(port, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});



app.set('view engine','pug')
app.set('views', './views');


// for parsing application/json
app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({extended:true}))


app.get('/', (req, res) => {
  console.log("Inside root link") ;
  res.render('chooseLink');
});

app.get('/renew',(req,res) => {
	res.send("New Page!!") ;
}) ;

app.get('/index',(req,res) => {
	res.render('index') ;
}) ;


app.get('/testForm',(req,res) => {
	res.render('form-submit') ;
}) ;

app.post('/appendToFile',(req,res) => {
  console.log("request first as is" + req.body.first)
  console.log("request last as is" + req.body.last)

  const firstName = req.body.first
  const lastName = req.body.last

  const stringInput = "\n==>testing write to file first = " +  firstName + " second = " + lastName

// append to a file named 2pac.txt
fs.appendFile('2pac.txt', stringInput, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Lyric saved!');
});
return res.redirect('/renew') ;
});
