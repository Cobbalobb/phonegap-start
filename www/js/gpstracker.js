document.addEventListener("deviceready", function(){
  if(navigator.network.connection.type == Connection.NONE){
    $("#home_network_button").text('No Internet Access')
                 .attr("data-icon", "delete")
                 .button('refresh');
  }
});

var track_id = '';      // Name/ID of the exercise
var watch_id = null;    // ID of the geolocation
var tracking_data = []; // Array containing GPS position objects
$("#startTracking_start").live('click', function(){
    // Start tracking the User
    watch_id = navigator.geolocation.watchPosition(
        // Success
        function(position){
            tracking_data.push(position);
        },
        // Error
        function(error){
            console.log(error);
        },
        // Settings
        { frequency: 3000, enableHighAccuracy: true });
    // Tidy up the UI
    track_id = $("#track_id").val();
    $("#track_id").hide();
    $("#startTracking_status").html("Tracking workout: <strong>" + track_id + "</strong>");
});

$("#startTracking_stop").live('click', function(){
  // Stop tracking the user
  navigator.geolocation.clearWatch(watch_id);
  // Save the tracking data
  window.localStorage.setItem(track_id, JSON.stringify(tracking_data));
  // Reset watch_id and tracking_data
  var watch_id = null;
  var tracking_data = null;
  // Tidy up the UI
  $("#track_id").val("").show();
  $("#startTracking_status").html("Stopped tracking workout: <strong>" + track_id + "</strong>");
});

// When the user views the history page
$('#history').live('pageshow', function () {
  // Count the number of entries in localStorage and display this information to the user
  tracks_recorded = window.localStorage.length;
  $("#tracks_recorded").html("<strong>" + tracks_recorded + "</strong> workout(s) recorded");
  // Empty the list of recorded tracks
  $("#history_tracklist").empty();
  // Iterate over all of the recorded tracks, populating the list
  for(i=0; i<tracks_recorded; i++){
    $("#history_tracklist").append("<li><a href='#track_info' data-ajax='false'>" + window.localStorage.key(i) + "</a></li>");
  }
  // Tell jQueryMobile to refresh the list
  $("#history_tracklist").listview('refresh');
});