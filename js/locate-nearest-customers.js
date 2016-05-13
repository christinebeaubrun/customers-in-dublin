var calculateDistance = require( './calculate-distance' );

module.exports = function ( options ) {
  options = options || commandLineOptions;
  /* 
    
    Takes an object with:
    -- startLatt [ Float ]
    -- endLong [ Float ]
    -- customers [ Array ]
    -- desiredDistance [ Number ] ( OPTIONAL )
    -- sortStatus [ Boolean ] ( OPTIONAL )
    -- sortBy [ String ] ( OPTIONAL )
    -- format [ String ] ( OPTIONAL )
    Returns array

  */

  var defaultDistance = 5;

  var startLatt = options.startLatt,
    endLong = options.endLong,
    customers = options.customers || [],
    desiredDistance = options.desiredDistance || defaultDistance,
    format = options.format || false,
    sortStatus = options.sortStatus || false,
    sortBy = options.sortBy || '';

  var isNullUndefinedEmpty = function ( arg ) {
    return (arg === null || arg === undefined || arg === "");
  };

  var length = customers.length; // variable length needs to be more clear, ex numOfCustomers

// why are you throwing an error below? 
  if ( isNullUndefinedEmpty( startLatt ) || isNullUndefinedEmpty( endLong ) ) {
    throw new Error( 'Please provide a starting and ending latitude and longitude' );
  }

  if ( length === 0 ) { // ex just use customers.length instead of creating extra variable
    throw new Error( 'Please provide an array of customers' );
  }

  var nearestCustomers = [];
  customers.forEach( function ( customer ) { // iterate over arr of customers
    var customerLat = parseFloat( customer.latitude ),
      customerLong = parseFloat( customer.longitude );
    
    var args = {
      lat1: startLatt,
      long1: endLong,
      lat2: customerLat,
      long2: customerLong
    };

    // calculate the difference between the two points
    if ( calculateDistance( args ) <= desiredDistance ) {
      if ( format ) {
        // if format is true, organize customers by default name and user_id
        nearestCustomers.push({
          name: customer.name,
          user_id: customer.user_id
        });
      } else {
        // format is false so push the entire object
        nearestCustomers.push( customer );
      }
    }
  });

  if ( sortStatus && sortBy ) {
    // if sortStatus is true and property is provided
    return nearestCustomers.sort( function (customerA, customerB ) {
      var user_idA = customerA[ sortBy ],
        user_idB = customerB[ sortBy ];

      return user_idA - user_idB;
    });
  } else {
    // return results as is
    return nearestCustomers;
  }
};
