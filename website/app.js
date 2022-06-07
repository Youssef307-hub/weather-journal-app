/* Global Variables */

// Personal API Key for OpenWeatherMap API
const API_KEY = '&appid=AddYourOwnKeyHere&units=metric';
// The base URL
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();



// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getWeatherInfo);


/* Function called by event listener (The callback function)*/
function getWeatherInfo() {
    const zipCode = document.getElementById('zip').value; // Variable to hold the zip code entered by the user
    const feelings = document.getElementById('feelings').value; // Variable to hold the message from the user
    getData(baseUrl, zipCode, API_KEY) // Calling the getData function by passing the baseUrl, zip code provided by the user and the personal api key

        // Chained promise of a Post request by passing the fetched data from getData function then another chain promise to update the interface
        .then(function (myData) {
            postData('/addData', {
                temprature: myData.main.temp,
                date: newDate,
                userResponse: feelings
            }) // Post request to update projectData
        })
        .then(function () {
            updateInterface() // Calling the updateInterface function to add the fetched data to the user interface
        })
}


/* Function to GET Web API Data*/

// A GET request to the OpenWeatherMap API.
const getData = async (baseUrl, zipCode, API_KEY) => {

    // Fetching the data from the API
    const response = await fetch(baseUrl + zipCode + API_KEY)
    try {
        // Assign myData with a promise which resolves with a JS object
        const myData = await response.json();
        return myData;

    } catch (E) {
        // The catch is to appropriately handle the error
        console.log("There's an Error!!", E)
    }
}

/* Function to POST data */

// A POST request to add the API data and data entered by the user
const postData = async (url = '', myData = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Converting a JS value to a JSON string
        body: JSON.stringify(myData)
    });
    try {
        // Assign myData with a promise which resolves with a JS object
        const myData = await response.json();
        return myData;

    } catch (E) {
        // The catch is to appropriately handle the error
        console.log("There's an Error!!", E)
    }
}



/* Function to GET Project Data then update the interface */
const updateInterface = async () => {
    
    // Fetching data from the app
    const response = await fetch('/allData');
    try {
        // Assign myData with a promise which resolves with a JS object
        const myData = await response.json();

        // Getting the Divs of the date, temp and content using getElementByID method the uppdating it's inner HTML with the fetched data
        document.getElementById('date').innerHTML = `Date: ${myData.date}`;
        document.getElementById('temp').innerHTML = `Temprature: ${myData.temprature} &#8451`;
        document.getElementById('content').innerHTML = `Your feeling: ${myData.userResponse}`;

    } catch (E) {
        // The catch is to appropriately handle the error
        console.log("There's an Error!!", E)
    }
}
