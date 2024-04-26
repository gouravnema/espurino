var wifi = require("Wifi");
var ssid = '6A6';
var password = 'ottffss123';

var red = NodeMCU.D1;
var green = NodeMCU.D2;
var blue = NodeMCU.D3;
var sound = NodeMCU.D5;


console.log("version 60");


wifi.connect(ssid, {password:password}, function(e) {
  if (e) {
    console.log('error during connect:',e);
    wifi.disconnect();
  } else {
    console.log('connected to',ssid);
    wifi.stopAP();
    wifi.save();
    try{
      setInterval(ping,5000);
      }catch(er){
        console.log(er.message);
      }
  }
});

function ping(){
var options = {
    host: 'gourav.heliohost.us', // host name
    port: 80,            // (optional) port, defaults to 80
    path: '/object/2',           // path sent to server
    method: 'GET',       // HTTP command sent to server (must be uppercase 'GET', 'POST', etc)
    protocol: 'http:',   // optional protocol - https: or http:
  };
var req = require("http").request(options, function(res) {
  let Data = "";
  var counter = 0;
  res.on('data', function(data) {
      counter+= data.length;
      if(counter < 1024){
        Data+=data;
      }
      if(counter>1024){
        try{
          req.end();
        }catch(e){
          return console.log("end error :: Size ", counter);
        } 
      }
      console.log("response size ", counter);
  });
  res.on('close', function(data) {
    console.log("total size ", counter);
    try{
    var pinData = JSON.parse(JSON.parse(Data).data);
    handlePins(pinData.R,pinData.G,pinData.B);
    console.log("Connection closed  ",pinData);
    }catch(e){
        console.log('PARSING ERROR ',e.message);
    }
  });
});
// You can req.write(...) here if your request requires data to be sent.
req.end();

}

function handlePins(r,g,b){
  digitalWrite(red,r);
  digitalWrite(blue,b);
  digitalWrite(green,g);
}



