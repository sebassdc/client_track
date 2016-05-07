var express = require('express');
  app = express();
  client_track = require('./index.js');

app.set('port', 3000);
app.get('/', function(req, res){
  client_track.reqlog(req);
  res.send('Testing client_track');
});

app.listen(app.get('port'), function(){
  console.log("Listening on port: ", app.get('port'));
})
