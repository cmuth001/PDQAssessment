# PDQAssessment

## Problem Statement:

  We have an API endpoint for you at: https://pdqemployees.azurewebsites.net/api/pdqemployees.

The API will return a random PDQ.com employee name with his or her favorite beer. You need to write an API that will interact with ours to retrieve a name and then go to https://www.pdq.com/about-us/ and lookup the picture of that employee. You should provide a user interface that will provide a button to invoke your API and then present the image of the employee returned from our function. We should be able to open your user interface on multiple browser clients, hit the button on one, and all browser clients should display the same employee image/name/drink across all connected clients. It should also state the beer they like. Don’t worry about making it super pretty, we are mostly concerned with its functionality. Keep in mind it should handle errors well.

## Steps to run:

* Clone this respository and go to the file directory **PDQAssessment**
* Run below command.
  1. > npm install
  2. > node index.js
* By above commands we are running the application in local server and to make your IP public run the below command.
  
  > ssh -R chandu.serveo.net:80:localhost:3000 serveo.net
  
  **http://serveo.net/:** Expose local servers to the internet
  
* If you success fully ran all the above commands click below link.
[chandu.serveo.net](http://chandu.serveo.net/)



## Follwing Libraries used for this assessment:

* ***express(Web framework):** To creating a robust API is quick and easy.
* **http:** For client server communication and also used for route methods like 'get' in our application.
* **socket.io(Client-server communication):** Push it to all other connected clients.
* **request:** Designed to be the simplest way possible to make http calls.
* **cheerio:** Cheerio parses markup and provides an API for traversing/manipulating the resulting data structure.


## References:

* https://www.npmjs.com/package/cheerio
* https://guides.github.com/features/mastering-markdown/
* https://socket.io/get-started/chat/
* https://www.pdq.com/about-us/
* https://pdqemployees.azurewebsites.net/api/pdqemployees
* https://expressjs.com/
* http://serveo.net/
