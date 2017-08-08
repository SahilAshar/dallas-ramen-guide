var Alexa = require('alexa-sdk');
var http = require('http');

var states = {
    SEARCHMODE: '_SEARCHMODE',
    TOPFIVE: '_TOPFIVE',
};

var location = "Dallas";

var numberOfResults = 3;

var APIKey = "4844d21f760b47359945751b9f875877";

var welcomeMessage = location + " Ramen Guide. You can ask me for a ramen restaurant, or  say help. What will it be?";

var welcomeRepromt = "You can ask me for an ramen restaurant, or  say help. What will it be?";

var locationOverview = "Though perhaps not as developed as many other major cities, Dallas does have a ramen scene. From traditional tonkotsu broth prepared by one of the city's best Japanese chefs to Texas-inspired ramen topped with smoked brisket, these restaurants serve up the area's best bowls. After trying them all, don't be surprised if those greasy packets of instant noodles no longer satisfy your cravings.";

var HelpMessage = "Here are some things you  can say: Give me an restaurant. Tell me about " + location + " ramen. Tell me the top five place to eat. What would you like to do?";

var moreInformation = "See your  Alexa app for  more  information."

var tryAgainMessage = "please try again."

var noAttractionErrorMessage = "There was an error finding this restaurant, " + tryAgainMessage;

var topFiveMoreInfo = " You can tell me a number for more information. For example open number one.";

var getMoreInfoRepromtMessage = "What number restaurant would you like to hear about?";

var getMoreInfoMessage = "OK, " + getMoreInfoRepromtMessage;

var goodbyeMessage = "OK, have a nice day.";

var newsIntroMessage = "These are the " + numberOfResults + " most recent " + location + " headlines, you can read more on your Alexa app. ";

var hearMoreMessage = "Would you like to hear about another ramen restaurant in " + location +"?";

var newline = "\n";

var output = "";

var alexa;

var restaurants = [
    { 
    	name: "Tei-An", 
    	content: "Getting a bowl of ramen at Tei-An is perhaps the best way to afford dining at this elegant Japanese eatery.", 
    	location: "1722 Routh St Suite 110, Dallas, TX 75201", 
    	contact: "214 220 2828" 
    },
    { 
    	name: "Ten Ramen", 
    	content: "This West Dallas ramen joint boasts a full, authentic ramen menu. Chef Teiichi Sakurai wants to mimic traditional Japanese ramen joints as closely as possible, so that means you cannot take the ramen out or sit while slurping — it's sit at the bar or nothing.", 
    	location: "1818 Sylvan Ave, Dallas, TX 75208", 
    	contact: "972 803 440" 
    },
    { 
    	name: "Ichiro Ramen Shop", 
    	content: "Ichiro is the newest spot on this map, having just opened last October. This ramen spot has simple decor and simply delicious ramen — the Spicy Tonkatsu is a crowd favorite.", 
    	location: "4906 Maple Ave, Dallas, TX 75235", 
    	contact: "214 643 6602" 
    },
    { 	
    	name: "Ramen Hakata", 
    	content: "This cozy Addison spot has an open kitchen to watch the pro chefs perfect your noodles. Try the garlicky Chashu Miso Ramen.", 
    	location: "3714 Belt Line Rd, Addison, TX 75001", 
    	contact: "972 247 2401" 
    },
    { 
    	name: "Wabi House", 
    	content: "This Lowest Greenville joint has a full ramen menu but also has delicious non-ramen items like fried shiitakes with bone marrow butter.", 
    	location: "1802 Greenville Ave Suite 100, Dallas, TX 75206", 
    	contact: "469 779 6474" 
    },
    { 
    	name: "20 Feet Seafood Joint", 
    	content: "Though primarily known for it's hearty seafood, 20 Feet Seafood Joint also makes a mean pork belly ramen.", 
    	location: "1146 Peavy Rd, Dallas, TX 75218", 
    	contact: "972 707 7442" 
    },
    { 
    	name: "Kazy's Gourmet", 
    	content: "Kazy's Gormet is a go-to stop for chefs. Swing by to get all the supplies necessary for a fresh, homemade sushi dinner, and grab a bowl of their tonkotsu ramen while you're in.", 
    	location: "9256 Markville Dr, Dallas, TX 75243", 
    	contact: "972 235 4831" 
    },
    { 
    	name: "Hanabi Ramen", 
    	content: "Hanabi has homes in Fort Worth and Carrolton. They recently added a veggie ramen to the menu, so feel free to bring your meat-free friends here.", 
    	location: "2540 Old Denton Rd #120, Carrollton, TX 75006", 
    	contact: "972 245 0100" 
    },
    { 
    	name: "Monta Ramen", 
    	content: "This Vegas export is know for it's variety in broths — try a bowl with the slightly odd looking 'kuro' ramen with black garlic oil.", 
    	location: "800 N Coit Rd #255B, Richardson, TX 75080", 
    	contact: "469 330 7777" 
    },
    { 
    	name: "Woodshed Smokehouse", 
    	content: "Believe it or not, this Fort Worth smokehouse has one of the most tasty ramen choices in DFW. Tim Love has crafted a delicious bowl of ramen with pulled pork, carrots, bell peppers, chiles, and a poached quail egg.", 
    	location: "3201 Riverfront Dr, Fort Worth, TX 76107", 
    	contact: "817 740 8835" 
    },
    { 
    	name: "Tanoshii Ramen", 
    	content: "This Deep Ellum ramen spot came to Dallas at the height of the city's ramen trend. They've taken some knocks from critics and diners on execution in the past, but Tanoshii is still one of the best places in Dallas for a steaming bowl of noodles.", 
    	location: "2724 Commerce St, Dallas, TX 75226", 
    	contact: "214 651 6800" 
    },
    { 
    	name: "Nova", 
    	content: "When it comes to making ramen, Nova doesn't really follow the rules. The spicy broth is reminiscent of those that you'll find in other bowls across the city and the noodles are top notch, but chef Eric Spigner has added several interesting touches to his own ramen. Instead of the traditional soft-boiled egg, you'll find a perfectly poached version instead. He also substitutes plump shrimp for pork, and adds a little fresh bell pepper and cilantro for a little Mexican flair.", 
    	location: "1417 W Davis St, Dallas, TX 75208", 
    	contact: "214 484 7123" 
    },
    { 
    	name: "Maru Ramen", 
    	content: "The ramen at Maru Ramen in Richardson is a mix of traditional flavors and experimental new versions of the centuries-old dish. You'll find the usual tonkatsu, shoyu and miso ramen on the menu, but the magic lies with the more creative iterations of the dish.", 
    	location: "400 N Greenville Ave #26, Richardson, TX 75081", 
    	contact: "972 792 8888" 
    },
/*    { 
    	name: "", 
    	content: "", 
    	location: "", 
    	contact: "" 
    },
    { 
    	name: "", 
    	content: "", 
    	location: "", 
    	contact: "" 
    },
    { 
    	name: "", 
    	content: "", 
    	location: "", 
    	contact: "" 
    },
    { 
    	name: "", 
    	content: "", 
    	location: "", 
    	contact: "" 
    },
    { 
    	name: "", 
    	content: "", 
    	location: "", 
    	contact: "" 
    },  */
];

var topFive = [
    { 
    	number: "1", 
    	caption: "Tei-An", 
    	more: "Getting a bowl of ramen at Tei-An is perhaps the best way to afford dining at this elegant Japanese eatery.", 
    	location: "1722 Routh St Suite 110, Dallas, TX 75201", 
    	contact: "214 220 2828" 
    },
    { 
    	number: "2", 
    	caption: "Ten Ramen", 
    	more: "This West Dallas ramen joint boasts a full, authentic ramen menu. Chef Teiichi Sakurai wants to mimic traditional Japanese ramen joints as closely as possible, so that means you cannot take the ramen out or sit while slurping — it's sit at the bar or nothing.", 
    	location: "1818 Sylvan Ave, Dallas, TX 75208", 
    	contact: "972 803 440" 
    },
    { 
    	number: "3", 
    	caption: "Ramen Hakata", 
    	more: "This cozy Addison spot has an open kitchen to watch the pro chefs perfect your noodles. Try the garlicky Chashu Miso Ramen.", 
    	location: "3714 Belt Line Rd, Addison, TX 75001", 
    	contact: "972 247 2401"  
    },
    { 
    	number: "4", 
    	caption: "Ichiro Ramen Shop", 
    	more: "Ichiro is the newest spot on this map, having just opened last October. This ramen spot has simple decor and simply delicious ramen — the Spicy Tonkatsu is a crowd favorite.", 
    	location: "4906 Maple Ave, Dallas, TX 75235", 
    	contact: "214 643 6602"  
    },
    { 
    	number: "5", 
    	caption: "Maru Ramen", 
    	more: "The ramen at Maru Ramen in Richardson is a mix of traditional flavors and experimental new versions of the centuries-old dish. You'll find the usual tonkatsu, shoyu and miso ramen on the menu, but the magic lies with the more creative iterations of the dish.", 
    	location: "400 N Greenville Ave #26, Richardson, TX 75081", 
    	contact: "972 792 8888"  
    }
];

var topFiveIntro = "Here are the top five ramen restaurants in " + location + ".";

var newSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = states.SEARCHMODE;
        output = welcomeMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
    'getOverview': function() {
    	this.handler.state = states.SEARCHMODE;
    	this.emitWithState('getOverview');
    },
    'getRestaurantIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getRestaurantIntent');
    },
    'getTopFiveIntent': function(){
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getTopFiveIntent');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
};

var startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {
    'getOverview': function () {
        output = locationOverview;
        this.emit(':tellWithCard', output, location, locationOverview);
    },
    'getRestaurantIntent': function () {
        var cardTitle = location;
        var cardContent = "";

        var restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
        if (restaurant) {
            output = restaurant.name + " " + restaurant.content + newline + moreInformation;
            cardTitle = restaurant.name;
            cardContent = restaurant.content + newline + restaurant.contact;

            this.emit(':tellWithCard', output, cardTitle, cardContent);
        } else {
            this.emit(':ask', noAttractionErrorMessage, tryAgainMessage);
        }
    },
    'getTopFiveIntent': function () {
        output = topFiveIntro;
        var cardTitle = "Top Five Ramen Places in " + location;

        for (var counter = topFive.length - 1; counter >= 0; counter--) {
            output += " Number " + topFive[counter].number + ": " + topFive[counter].caption + newline;
        }
        output += topFiveMoreInfo;
        this.handler.state = states.TOPFIVE;
        this.emit(':askWithCard', output, topFiveMoreInfo, cardTitle, output);
    },
    'AMAZON.YesIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.NoIntent': function () {
        output = HelpMessage;
        this.emit(':ask', HelpMessage, HelpMessage);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },
    'getNewsIntent': function () {
        httpGet(location, function (response) {

            // Parse the response into a JSON object ready to be formatted.
            var responseData = JSON.parse(response);
            var cardContent = "Data provided by New York Times\n\n";

            // Check if we have correct data, If not create an error speech out to try again.
            if (responseData == null) {
                output = "There was a problem with getting data please try again";
            }
            else {
                output = newsIntroMessage;

                // If we have data.
                for (var i = 0; i < responseData.response.docs.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var headline = responseData.response.docs[i].headline.main;
                        var index = i + 1;

                        output += " Headline " + index + ": " + headline + ";";

                        cardContent += " Headline " + index + ".\n";
                        cardContent += headline + ".\n\n";
                    }
                }

                output += " See your Alexa app for more information.";
            }

            var cardTitle = location + " News";

            alexa.emit(':tellWithCard', output, cardTitle, cardContent);
        });
    },

    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

var topFiveHandlers = Alexa.CreateStateHandler(states.TOPFIVE, {
    'getRestaurantIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getRestaurantIntent');
    },
    'getOverview': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getOverview');
    },
    'getTopFiveIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getTopFiveIntent');
    },
    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },

    'getMoreInfoIntent': function () {
        var slotValue = this.event.request.intent.slots.restaurant.value;
        var index = parseInt(slotValue) - 1;

        var selectedAttraction = topFive[index];
        if (selectedAttraction) {

            output = selectedAttraction.caption + ". " + selectedAttraction.more + ". " + hearMoreMessage;
            var cardTitle = selectedAttraction.name;
            var cardContent = selectedAttraction.caption + newline + newline + selectedAttraction.more + newline + newline + selectedAttraction.location + newline + newline + selectedAttraction.contact;

            this.emit(':askWithCard', output, hearMoreMessage, cardTitle, cardContent);
        } else {
            this.emit(':ask', noAttractionErrorMessage);
        }
    },

    'AMAZON.YesIntent': function () {
        output = getMoreInfoMessage;
        alexa.emit(':ask', output, getMoreInfoRepromtMessage);
    },
    'AMAZON.NoIntent': function () {
        output = goodbyeMessage;
        alexa.emit(':tell', output);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
    },

    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

exports.handler = function (event, context, callback) {
    alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandlers, startSearchHandlers, topFiveHandlers);
    alexa.execute();
};

// Create a web request and handle the response.
function httpGet(query, callback) {
  console.log("/n QUERY: "+query);

    var options = {
      //http://api.nytimes.com/svc/search/v2/articlesearch.json?q=seattle&sort=newest&api-key=
        host: 'api.nytimes.com',
        path: '/svc/search/v2/articlesearch.json?q=' + query + '&sort=newest&api-key=' + APIKey,
        method: 'GET'
    };

    var req = http.request(options, (res) => {

        var body = '';

        res.on('data', (d) => {
            body += d;
        });

        res.on('end', function () {
            callback(body);
        });

    });
    req.end();

    req.on('error', (e) => {
        console.error(e);
    });
}

String.prototype.trunc =
      function (n) {
          return this.substr(0, n - 1) + (this.length > n ? '&hellip;' : '');
      };
