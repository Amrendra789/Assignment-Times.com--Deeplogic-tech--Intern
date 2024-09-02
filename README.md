Time.com Latest Stories API
This project is a Node.js application that provides a simple REST API to fetch the latest stories from Time.com using Puppeteer and Express.js.

Features
Web Scraping: The application uses Puppeteer, a headless browser for Node.js, to navigate to Time.com and scrape the latest stories.
REST API: The application exposes a single GET endpoint (/getTimeStories) that returns the latest six stories from Time.com in JSON format.
Express.js: A minimal and flexible Node.js web application framework that provides a robust set of features for building web applications.

Installation
Clone the repository:
git clone https://github.com/your-username/time-stories-api.git
cd time-stories-api

Install dependencies:
npm install
This will install all required packages, including Express.js and Puppeteer.

Usage
Start the server:
node server.js
The server will start running on http://localhost:3000.

Access the API:
Navigate to http://localhost:3000/getTimeStories in your browser or use a tool like Postman to send a GET request.
The API will return a JSON array containing the latest six stories from Time.com, each with a title and link.

Code Explanation
1. Setup and Dependencies
The application uses two main dependencies:
Express: To set up the web server and handle incoming requests.
Puppeteer: To launch a headless browser and scrape data from Time.com.

2. GET Endpoint /getTimeStories
This is the main route of the application. When a GET request is made to this endpoint:
Puppeteer launches a headless browser and navigates to https://time.com.
The page is fully loaded by waiting until the network is idle.
Story extraction is performed by evaluating JavaScript within the page context:
It selects all <a> tags with relative URLs (links starting with /).
It then loops through these links, extracting the title (text within the anchor tag) and href (link).
The first six stories matching the pattern (those leading to actual articles) are saved into an array.
The browser is closed to free up resources.
The extracted stories are returned as a JSON response.

3. Error Handling
The application includes basic error handling:
If an error occurs during the scraping process (e.g., if Time.com’s structure changes), the application will catch the error and return a 500 Internal Server Error status with an appropriate message.

4. Server Listening
The server listens on port 3000 by default and logs a message to the console when it starts successfully.

Example JSON Response
Here's an example of the JSON response you can expect when you hit the /getTimeStories endpoint:

[
    {
        "title": "Amy Schneider’s Jeopardy! Streak Ends at 40 Consecutive Wins and $1.4 Million",
        "link": "https://time.com/6142934/amy-schneider-jeopardy-streak-ends/"
    },
    {
        "title": "'Writing With Fire' Shines a Light on All-Women News Outlet",
        "link": "https://time.com/6142628/writing-with-fire-india-documentary/"
    },
    {
        "title": "Moderna Booster May Wane After 6 Months",
        "link": "https://time.com/6142852/moderna-booster-wanes-omicron/"
    },
    {
        "title": "Pressure Mounts for Biden to Nominate a Black Woman to the Supreme",
        "link": "https://time.com/6142743/joe-biden-supreme-court-nominee-black-woman-campaign-promise/"
    },
    {
        "title": "The James Webb Space Telescope Is in Position—And Now We Wait",
        "link": "https://time.com/6142769/james-webb-space-telescope-reaches-l2/"
    },
    {
        "title": "We Urgently Need a New National COVID-19 Response Plan",
        "link": "https://time.com/6142718/we-need-new-national-covid-19-response-plan/"
    }
]

Contributing
If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

License
This project is open-source and available under the MIT License.
