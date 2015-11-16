var fs = require('fs');
var readSource = '/Users/christinebeaubrun/customers-in-Dublin/customers.text';

var customersNearDublinOffice = function ( customers, unit, desiredDistance ) {
  /* customers is an array with a list of objects
    the objects contain info about a customer
    -- write test that confirms it returns an array of customers given:
    ---- unit: kilometers, miles ( default ), or nautical miles
  */
  var OFFICE_LAT = 53.3381985;
  var OFFICE_LONG = -6.2592576;

  var calculateDistance = function ( customerLat, customerLong ) {
    /*
      write test that confirms it returns distance given:
      -- lat and long
    */
    var radlat1 = Math.PI * OFFICE_LAT/180;
    var radlon1 = Math.PI * OFFICE_LONG/180;

    var radlat2 = Math.PI * customerLat/180;
    var radlon2 = Math.PI * customerLong/180;

    var theta = OFFICE_LONG - customerLong;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;

    if (unit === "K") {
      dist = dist * 1.609344;
    }

    if (unit === "N") {
      dist = dist * 0.8684;
    }

    return dist;
  };

  var length = customers.length;
  if ( length > 0 ) {
    var nearestCustomers = customers.filter( function ( customer ) {
      var latitude = parseFloat( customer.latitude ),
        longitude = parseFloat( customer.longitude );

      return calculateDistance(latitude, longitude) <= desiredDistance;
    });

    nearestCustomers.sort( function (customerA, customerB ) {
      var user_idA = customerA.user_id,
        user_idB = customerB.user_id;

      return user_idA - user_idB;
    });

    return nearestCustomers.map( function ( customer ) {
      return {
        name: customer.name,
        user_id: customer.user_id
      };
    });
  }
};

/** Using the readFile API - Asynchronous */
fs.readFile(readSource, "utf8", function(err, data){
  if ( err ){ throw err;}
  var regex = /\n/;
  var customersData = data.split( regex );
  customersData = customersData.map(function ( str ) {
    return JSON.parse( str );
  });

  var customers = customersNearDublinOffice( customersData, "K", 100);
  console.log( customers );
});

/*
  TO-DO LIST
  -- invite any customer within 100km of our Dublin office
*/