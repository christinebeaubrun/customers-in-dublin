var calculateDistance = require( './calculate-distance' );

module.exports = function ( customers, unit, desiredDistance ) {
  /* customers is an array with a list of objects
    the objects contain info about a customer
    -- write test that confirms it returns an array of customers given:
    ---- unit: kilometers, miles ( default ), or nautical miles
  */
  var OFFICE_LAT = 53.3381985;
  var OFFICE_LONG = -6.2592576;

  var length = customers.length;
  if ( length > 0 ) {
    var nearestCustomers = customers.filter( function ( customer ) {
      var latitude = parseFloat( customer.latitude ),
        longitude = parseFloat( customer.longitude );
      
      var args = {
        lat1: OFFICE_LAT,
        long1: OFFICE_LONG,
        lat2: latitude,
        long2: longitude,
        unit: unit
      };

      return calculateDistance(args) <= desiredDistance;
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