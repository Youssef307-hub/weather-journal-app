// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

// Setting the port 8000 for app to listen
const port = 8000;

// initalizing the server to start listening and show a message in the console
const myServer = app.listen(port, ()=>{console.log(`The app is listening on port: ${port}`)});  // Here I used the arrow function to make it more effecint

// A POST route that adds incoming data to projectData
app.post('/addData', (req, res) =>{
    projectData['temprature'] = req.body.temprature; 
    projectData['date'] = req.body.date;
    projectData['userResponse'] = req.body.userResponse;
    res.send(projectData);
    console.log(projectData);  
});

// A GET route that returns the projectData object
app.get('/allData', (req, res)=> {  res.send(projectData) } );