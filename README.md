Weather App - Backend + Frontend

Firstly, I started with the backend part, developing a weather API. I chose
to make a Spring Boot project in Intellij. Spring Boot is a framework for Java
which helps to create applications very fast. I want to build a RESTful web
server which can respond to HTTP requests. Spring Initializr creates a predefined
structure for my project, includes external libraries, configures Spring Boot,
and it offers a pom.xml.

Secondly, I choose Spring Web because my app needs to respond to requests like
GET /weather?location=London, Spring Data Redis to avoid repetitive requests, if
someone requests for Paris, it saves the answer in Redis for 12 hours, and if it
asks again for Paris, it responds directly from cache without questioning API.
Lombok generates methods like getters, setters, toString, equals etc. Spring
Boot DevTools activates autoreload when if the code gets modified, includes a
LiveReload server to reload the browser and I don't have to restart the app.

So, what exactly does the backend part do? I, the client, want to find out the
weather in a city, like Paris. To get that information I send a GET request to
my API. The request looks like this GET /weather?location=Paris. What does my
API do with the request? My API receives the request, checks if the data is
already saved in my cache (in Redis). If not, my API asks another API (Visual
Crossing) for data. Receives data, and it sends them back to me in a JSON format.
I use the cache to reduce the requests for Visual Crossing which it has a limit,
the meteo data doesn't change every second, so this means my client receives
faster answers.

WeatherController:
As a first step, I created an endpoint API.

GetMapping - define a GET route
RequestParam - takes a parameter from URL
RestController - my class can respond to HTTP requests and directly return data

@GetMapping("/weather") - this tells, when someone makes a GET request to
/weather, call the method http://localhost:8080/weather?location=Paris

public String getWeather(@RequestParam String location) - this method responds
to HTTP requests, for example if ?location=London, then location = "London".

WeatherResponse:
This class contains the fields that will contain the information that it will be
returned after a request. Fields like location, temperature, feels like etc.

WeatherService:
RestTemplate - is a class from Spring which simplifies the process of sending
the requests HTTP. It helps me to call the API from Visual Crossing.
ResponseEntity<JsonNode> - it's a wrapper from Spring which contains the body
of the response, the status (200, 404), and headers.
restTemplate.getForEntity(url, JsonNode.class); - sends a GET request using a
JsonNode object.
JsonNode - from Jackson, it's a generic JSON, like a tree

How does exactly this class works? It creates an HTTP GET request the URL that
was build. Then, getForEntity() says I want a GET request to the URL and I want
to receive an answer which you will wrap in a JsonNode. I receive a packet that
looks like this:
HTTP/1.1 200 OK
Content-Type: application/json

{
"currentCondition": {
"temp":25.3,
"humidity":70
},
"days" :...
}

Next step is to extract only the body and then get all the information I need,
the fields from WeatherResponse class. Finally, I return the information.

I also added the cache, Redis. The changes I made are as followed: I enabled the
caching, I configured Redis, to run it local on docker, and WeatherResponse needs
to implement Serializable because Redis saves objects in byte array.
private static final long serialVersionUID = 1L; - this is an unic id necessary
for serialization/deserialization. And with this the backend is finished.

For the frontend part, I used React. I started from a template offered by the
language. For example, I changed App.js to load in browser what I have implemented
in Weather.js and then import it to index.js which is the entry point of the
application, it starts React and injects it into the HTML. The Weather.css covers
the design of the page. I simply played with the fonts, colors, alignments,
transparency, buttons design, background etc. And Weather.js deals with what to
load and functionalities. Like, the background image when the client accesses the
button get weather, it loads an image from the location the weather was asked.
I did that using a key from Unsplash. Then, based on the conditions of the
weather, it returns a relevant emoji. Based on the temperature, it returns
what to wear outside. I also have the option to get the current location,
without introducing a city. After all this, the last thing is the user
interface. This handles the title, how the functionalities of the buttons,
like submit, show the data.

Start backend:
docker start redis-local
mvn spring-boot:run

Start frontend:
npm start