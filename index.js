const request = require('request');

let apiUrl = 'https://gate.gopay.cz/api';
let settings = {};

const exports = module.exports = {};

exports.init = (settings) => {
 if (settings.sandbox) apiUrl = 'https://gw.sandbox.gopay.com/api';
 settings = settings;
}

exports.getToken = (scope, callback) => {
 let auth = "Basic " + new Buffer(settings.clientID + ":" + settings.clientSecret).toString("base64");
 const options = {
  url: apiUrl + '/oauth2/token',
   headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization':auth
   },
   form: {
    grant_type: 'client_credentials',
    scope: scope
   }
  }
 request.post(options, (err, response, body) => {
  if (err) return err;
  if (response.statusCode !== 200) return callback(response.statusCode);
  let gopayres = JSON.parse(body);
  callback(null, gopayres.access_token);
 });
}

exports.createPayment = (token, data, callback) => {
 if (!token || token === '') return callback('Error: Missing token');
 let auth = new Buffer(token).toString("base64");
 const options = {
  url: apiUrl + '/payments/payment',
  headers: {
   'Accept': 'application/json',
   'Authorization': 'Bearer ' + token
  },
  json: data
 }
 request.post(options, (err, response, body) => {
  if (err) return callback(err);
  if (response.statusCode !== 200) return callback(response.statusCode);
  callback(null, body);
 });
}

exports.getStatus = (token, id, callback) => {
 if (!token || token === '') return callback('Error: Missing token');
 if (!id || id === '') return callback('Error: Missing payment ID ');
 const options = {
  url: apiUrl + '/payments/payment/' + id,
  headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/x-www-form-urlencoded',
   'Authorization': 'Bearer ' + token
  }
 }
 request.get(options, (err, response, body) => {
  if (err) return callback(err);
  if (response.statusCode !== 200) return callback(response.statusCode);
  callback(null, JSON.parse(body));
 });
}