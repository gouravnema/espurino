//Espurino on node mcu. D1 red led, d2 green led, d3 blue, d5 buzzer
// count for 25 sec with 2 green and blue then 5 sec long beep with red color. re starts the counter. 
var s = false;
var red = NodeMCU.D1;
var green = NodeMCU.D2;
var blue = NodeMCU.D3;
var sound = NodeMCU.D5;

var counter = 1;
const OFF = 4;
const RED_ON = 0;
const GREEN_ON = 1;
const BLUE_ON = 2;



var intv =  setInterval(function(){
  var cR = OFF;
  var cB = 2;
  var cG = 1;
  if(counter > 249){
    cB = 4;
    cG = 4;
    cR=0;
  }

  digitalWrite(red,counter%3 === cR);
  digitalWrite(green,counter%3 === cG);
  digitalWrite(blue,counter%3 === cB);
  digitalWrite(sound, (counter%5 ===0) );
  if(counter>249){
     digitalWrite(sound, 1 );
  }
  
  if(counter>300){
     counter = 0;
  }
  counter++;
  
},100);
save();

