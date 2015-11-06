var fs = require('fs');
var readSource = '/Users/christinebeaubrun/customers-in-Dublin/customers.text';

var customersNearDublinOffice = function ( customers ) {
  var OFFICE_LAT = 53.3381985;
  var OFFICE_LONG = -6.2592576;

  var calculateDistanceInKm = function ( customerLat, customerLong ) {
    var EARTH_RADIUS = 6371; // radius of earth in km

    var degreeLat = convertDegtoRad(OFFICE_LAT - customerLat);
    var degreeLong = convertDegtoRad(OFFICE_LONG - customerLong);

    var a =
    Math.sin(degreeLat/2) * Math.sin(degreeLat/2) +
    Math.cos(convertDegtoRad(customerLat)) * Math.cos(convertDegtoRad(OFFICE_LAT)) *
    Math.sin(degreeLong/2) * Math.sin(degreeLong/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = EARTH_RADIUS * c; // Distance in km
    return d;
  };

  var convertDegtoRad = function ( degree ) {
    return degree * (Math.PI/180);
  };
};

/** Using the readFile API - Asynchronous */
fs.readFile(readSource, "utf8", function(err, data){
  if ( err ){ throw err;}
  var regex = /\n/;
  var customersData = data.split( regex );
  customersData = customersData.map(function ( str ) {
    return JSON.parse( str );
  });
  console.log( customersData );
});

