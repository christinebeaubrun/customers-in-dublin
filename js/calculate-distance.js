module.exports = function ( args ) {
  // what is arg? if an object, state it
  
  /*
    Qs: what does your code do? did you name your function ex. calculate-distance? did you name your args ex. start point / end point?
    Calculate distance (in kilometers) between two points given as (long, latt) pairs 
    based on Haversine formula (http://en.wikipedia.org/wiki/Haversine_formula). 
    Implementation inspired by JavaScript implementation from http://www.movable-type.co.uk/scripts/latlong.html

    Takes an object with starting latitude and ending longitude for two points
    Returns distance in kilometer(s)
    
  */

  var EARTH_RADIUS = 6371; // km ex EARTH_RADIOUS_KILOMETER

  var startLatt1 = args.lat1, // office latt
    startLong1 = args.long1, // office long
    endLatt2 = args.lat2, // customer latt
    endLong2 = args.long2; // customer long

  var toRadian = function ( degree ) { 
    // convert decimal degree into radian
    return ( Math.PI * degree ) / 180;
  };

  var diffLatt = toRadian( endLatt2 - startLatt1 );
  var diffLong = toRadian( endLong2 - startLong1 );

  var radStartLatt1 = toRadian( startLatt1 );
  var radEndLatt2 = toRadian( endLatt2 );

  var a = Math.sin( diffLatt / 2 ) * Math.sin( diffLatt / 2 ) +  
          Math.cos( radStartLatt1 ) * Math.cos( radEndLatt2 ) *   
          Math.sin( diffLong / 2 ) * Math.sin( diffLong / 2 );
  /*
      var a = (
           (Math.sin( diffLatt / 2 ) * 
            Math.sin( diffLatt / 2 )) +  
          (
            Math.cos( radStartLatt1 ) * 
            Math.cos( radEndLatt2 ) *   
            Math.sin( diffLong / 2 ) * 
            Math.sin( diffLong / 2 )
          )
       );
  */

  var c = 2 * Math.asin( Math.sqrt( a ) );

  return EARTH_RADIUS * c;
};

/*
Things to keep in mind when rewriting this function
function calculate_distance (start_point, end_point) {…}
function toRadian (degree) {…}

module.exports = calculate_distance;
*/
