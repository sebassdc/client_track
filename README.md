Client_track
-----

*A simple client tracker for express servers*

1.  Install:

        $ npm install string-format

2.  Require:

        var format = require('string-format')


##### Example:

```javascript
var express = require('express'),
  client_track = require('client_track');
  app = express();

app.set('port', 8080); // Listening port

// Getting '/'
app.get('/', function(req, res){
  client_track.reqlog(req); // Log the req data
  res.send('hello world');
});

// Listening
app.listen(app.get('port'), function(){
  console.log("Listening on port: ", app.get('port'));
});

```
