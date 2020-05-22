'use strict';
const fs = require('fs');
const jwt = require('jsonwebtoken');
var privateKEY  = fs.readFileSync('./JWT/private.key', 'utf8');
var publicKEY  = fs.readFileSync('./JWT/public.key', 'utf8');


//Jwt signing
var payload = {
  data1: "Data 1",
};

var i  = 'Gebruiker';
var s  = 'gebruiker@mail.com';
var a  = 'http://nieuwewebsite.nl';
var signOptions = {
  issuer:  i,
  subject:  s,
  audience:  a,
  expiresIn:  "1m",
  algorithm:  "RS256"
};
var token = jwt.sign(payload, privateKEY, signOptions);
console.log("Token :" + token);


//Jwt verify
var verifyOptions = {
  issuer:  i,
  subject:  s,
  audience:  a,
  expiresIn:  "1m",
  algorithm:  ["RS256"]
};

//private en public key opslaan in cookies
/*var x = document.cookie;
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}*/

var legit = jwt.verify(token, publicKEY, verifyOptions);
console.log("\nJWT verification result: " + JSON.stringify(legit));

setTimeout(function(){
  var legit = jwt.verify(token, publicKEY, verifyOptions);
  console.log("\nJWT verification result: " + JSON.stringify(legit));
}, 60000);

