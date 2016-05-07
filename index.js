var format = require('string-format'),
  fs = require('fs');

// usrAgentPaser(string) ==> Parse the device from the req.header['user-agent']
function usrAgentPaser(str){
  var usra = JSON.stringify(str);
  usra = usra.split(' ');
  usra = format("{0} {1}", usra[2], usra[3]);
  return usra.substring(0, usra.length - 1);
}

// parseIp(string) ==> Parse the ip from the req.headers['x-forwarded-for']
function parseIp(str){
  var iparray = str.split(':');
  return iparray[iparray.length -1];
}

// addToFile(filename, string) ==> Shorcut to add [string] to a [filename]
function addToFile(filename, str){
  var file = fs.readFileSync(filename, 'utf8');
  var final_log = file + '\n' + str;
  fs.writeFile(filename, final_log, function(err) {
    if(err){
      console.log(err);
    }else{
      console.log(str); // Just log the new client
    }
  });
}

// exitsFile(filename) ==> Checks syncronous and return true if the given file exist
function existFile(filename){
  try {
    // Query the entry
    stats = fs.lstatSync(filename);
    return stats.isFile();
  }
  catch (e) {
    console.log(filename + " NOT FOUND\n Creating file"); // Loggin to user that we create a new file
    return false;
  }
}

exports.reqlog = function (req){
  var LOGFILE = './req.json'; // Filename where to put the data
  // Parsing the data
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  ip = parseIp(ip);
  var userAgent = usrAgentPaser(req.headers["user-agent"]);

  // Checking server time
  var date = Date()

  // subtemplate (just for add mor data in the future)
  var str = '"date": "{0}",\n  "ip": "{1}",\n  "device": "{2}"'
  str = format(str, date, ip, userAgent); // Using like python string.format()
  str = "{\n  " + str + "\n},"; // Final wraping to addToFile

  // Let's check if the file exits
  if(!existFile(LOGFILE)){
    fs.writeFileSync(LOGFILE,"// "+ date, 'utf8'); // If not then create a file with de current date
  }
  addToFile(LOGFILE, str); // Every call log a str in the logfile
}
