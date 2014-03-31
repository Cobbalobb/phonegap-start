document.addEventListener('deviceready', function() {
                try {
                    //alert('Device is ready! Make sure you set your app_id below this alert.');
                    //Put your FB APP_ID here!
                    FB.init({ appId: "483622355081269", nativeInterface: CDV.FB, useCachedDialogs: false });
                    document.getElementById('data').innerHTML = "";
                    } catch (e) {
                    //alert(e);
                    }
                    }, false);


// These are the notifications that are displayed to the user through pop-ups if the above JS files does not exist in the same directory-->
            //if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
            //if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
            //if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
            
            FB.Event.subscribe('auth.login', function(response) {
                               //alert('auth.login event');
                               });
            
            FB.Event.subscribe('auth.logout', function(response) {
                               //alert('auth.logout event');
                               });
            
            FB.Event.subscribe('auth.sessionChange', function(response) {
                               //alert('auth.sessionChange event');
                               });
            
            FB.Event.subscribe('auth.statusChange', function(response) {
                               //alert('auth.statusChange event');
                               });
 
            /*function getSession() {
                alert("session: " + JSON.stringify(FB.getSession()));
            }
            */
            function getLoginStatus() {
              //alert('loginstatus');
                FB.getLoginStatus(function(response) {
                                  if (response.status == 'connected') {
                                    //alert('true');
                                    return true;
                                  }
                                  // else {
                                  //   alert('false');
                                  //   return true;
                                  // }
                                  });
            }
            var friendIDs = [];
            var fdata;
            function me() {
                FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
                       if (response.error) {
                       //alert(JSON.stringify(response.error));
                       } else {
                       var data = document.getElementById('data');
                       fdata=response.data;
                       console.log("fdata: "+fdata);
                       response.data.forEach(function(item) {
                                             var d = document.createElement('div');
                                             d.innerHTML = "<img src="+item.picture+"/>"+item.name;
                                             data.appendChild(d);
                                             });
                       }
          var friends = response.data;
          console.log(friends.length); 
          for (var k = 0; k < friends.length && k < 200; k++) {
                var friend = friends[k];
                var index = 1;

                friendIDs[k] = friend.id;
                //friendsInfo[k] = friend;
          }
          console.log("friendId's: "+friendIDs);
                       });
            }
            
            function flogout() {
                FB.logout(function(response) {
                          //alert('logged out');
                          });
            }
            
            function flogin() {
              html = '<h1 id="badgeearned">Signing in with facebook</h1>';
              html += '<div id="badge-name"><h3><img src="img/loadinggreen.gif"></h3></div>';
              $('#badgealert').append(html);
              $('#bgfade').fadeIn();
              $('#badgealert').fadeIn();
              alert('fb.js linke 92');
                FB.login(
                         function(response) {
                          //alert('test');
                          //alert(response);
                          //alert(response.session);
                          facebookLogin();
                         if (response.session) {
                          alert('fb line 100');
                         //alert('logged in');
                         } else {
                          alert('fb line 103');
                         //alert('not logged in');
                         }
                         },
                         { scope: "email, publish_actions" }
                         );
            }


      function facebookWallPost(name) {
        name = unescape(name);
          console.log('Debug 1');
        var params = {
            method: 'feed',
            name: name,
            link: 'https://carboncutterapp.co.uk/',
            picture: 'http://carbon.jamescobbett.co.uk/www/img/carboncutter.jpg ',
            caption: 'Carbon Footprint',
            description: 'Carbon cutter is an android application that helps you lower and monitor your carbon footprint.'
          };
        console.log(params);
          FB.ui(params, function(obj) { console.log(obj);});
      }
            
      function publishStoryFriend() {
        randNum = Math.floor ( Math.random() * friendIDs.length ); 

        var friendID = friendIDs[randNum];
        if (friendID == undefined){
          //alert('please click the me button to get a list of friends first');
        }else{
            console.log("friend id: " + friendID );
              console.log('Opening a dialog for friendID: ', friendID);
              var params = {
                method: 'feed',
                  to: friendID.toString(),
                  name: 'Facebook Dialogs',
                  link: 'https://developers.facebook.com/docs/reference/dialogs/',
                  picture: 'http://fbrell.com/f8.jpg',
                  caption: 'Reference Documentation',
                  description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
            };
          FB.ui(params, function(obj) { console.log(obj);});
          }
      }

function displayactiontoggle(){
    var html;
    FB.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        // html += '<form name="fbactions" id="fbactions" action="#" method="post">';
        // html += '<label for="fbactionswitch" id="fbactionswitch-label">Flip switch:</label>';
        // html += '<select name="fbactionswitch" id="fbactionswitch" data-role="slider" tabindex="-1" class="ui-slider-switch">';
        // html += '<option value="0">Off</option>';
        // html += '<option value="1">On</option>';
        // html += '</select><div role="application" class="ui-slider ui-slider-switch ui-slider-track ui-shadow-inset ui-bar-inherit ui-corner-all" style=""><span class="ui-slider-label ui-slider-label-a ui-btn-active" role="img" style="width: 0%;">On</span><span class="ui-slider-label ui-slider-label-b" role="img" style="width: 100%;">Off</span><div class="ui-slider-inneroffset"><a href="#" class="ui-slider-handle ui-slider-handle-snapping ui-btn ui-shadow" role="slider" aria-valuemin="0" aria-valuemax="1" aria-valuenow="0" aria-valuetext="Off" title="Off" aria-labelledby="fbactionswitch-label" style="left: 0%;"></a></div></div>';
        // html += '</form>';
      } else {
        html = '<div id="fb-sign" class="fb-sign-friends"><a href="#" onClick="fblogin();"><img src="http://carbon.jamescobbett.co.uk/www/img/facebooksign.png">Sign in with facebook to see your friends</a></div>';
      }
      });
      $('#fbactionstoggle').append(html);
}
