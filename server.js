const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement, duplicateChecker } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res, next) => {
  
    res.send({
        quote: getRandomElement(quotes),
  });
});

// TODO => getRandomElement function will return a random object { quote: 'some text', person:'some name'}. This is stored inside quote variable and this is fetched to client. However after clicking the button text that I got fetch in form: {"quote":{"quote":"We build our computer (systems) the way we build our cities: over time, without a plan, on top of ruins.","person":"Ellen Ullman"}} will get transformed through renderQuotes function in scripts.js


// User enters text (name of author) into input field. Upon pressing Fetch By Author, query is created in form of person=${author} (${author} is store as req.query.person)request is send through app.get("/api/quotes", (req, res, next)={...}. This then is filtered and adequate response is sent back(either quote objects with author or  empty - it also depends on button the user clicks -> Fetch All Quotes or Fetch by Author)
app.get("/api/quotes", (req, res, next) => {
  if (req.query.person !== undefined) {
    const quotesByPerson = quotes.filter((quote) => 
      {quote.person === req.query.person}
    );

// TODO ***********************************************************

//* quotes.filter((quote) => {quote.person === req.query.person}); 

//* is not the same as:

//* quotes.filter(quote => quote.person === req.query.person);

//* Try to keep one liners without unnecessary brackets
// TODO **************************************************************

    res.send({
      quotes: quotesByPerson,
    });
  } else {
    res.send({
      quotes: quotes,
    });
  }
});

// expected query => req.query.person and req.query.quote
// {"quote":{"quote":"The Internet? Is that thing still around?","person":"Homer Simpson"}} => req.query.person = "Homer Simpson" and req.query.quote = "The Internet? Is that thing still around?"

app.post('/api/quotes', (req,res,next) => {

    const newQuote = {
        person: req.query.person,
        quote: req.query.quote
    }

    // Checking if input is not empty, null or undefined

    if (newQuote.person && newQuote.quote){

        // so if they are not empty, further check if there is no duplicate

        const noDuplicates = duplicateChecker(newQuote)
        if(noDuplicates){
            quotes.push(newQuote);
            res.send({quote:newQuote})
        } else{
            res.status(409).send()
        }
    }   else {
        res.status(400).send()
    }
})





app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
