var format = require('string-format'),
  fs = require('fs');


function addToFile(filename, str){
  var file = fs.readFileSync(filename, 'utf8');
  var final_log = file + '\n' + str;
  fs.writeFile(filename, final_log, function(err) {
    if(err){
      console.log(err);
    }else{
      console.log(final_log);
    }
  });
}
function existFile(filename){
  try {
    // Query the entry
    stats = fs.lstatSync(filename);
    return stats.isFile();
  }
  catch (e) {
    console.log("req.json NOT FOUND\n Creating file");
    return false;
  }
}
function usrAgentPaser(str){
  var usra = JSON.stringify(str).split(' ')[2];
  return usra;
}
function parseIp(str){
  var iparray = str.split(':');
  return iparray[iparray.length -1];
}
exports.reqlog = function (req){
  var LOGFILE = './req.json';
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  ip = parseIp(ip);
  var userAgent = usrAgentPaser(req.headers["user-agent"]);
  var date = Date()
  var str = '"date": "{0}",\n  "ip": "{1}",\n  "device": "{2}"'
  str = format(str, date, ip, userAgent);
  str = "{\n  " + str + "\n},";
  if(!existFile(LOGFILE)){
    fs.writeFileSync(LOGFILE,"// "+ date, 'utf8');
  }
  addToFile(LOGFILE, str);
}
