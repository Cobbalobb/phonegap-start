// Page initialisation
$( document ).on( "pageinit", function( event ) {
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $(".ui-page").on("pageshow" , function() {
       if($.mobile.activePage.attr("id") == 'home'){
         getUserInfo();
       }
       if($.mobile.activePage.attr("id") == 'actions'){
         getActionsL();
       }
       if($.mobile.activePage.attr("id") == 'todo'){
         getListActionsL();
       }
       if($.mobile.activePage.attr("id") == 'completedactions'){
         getCompletedActionsL();
       }
       if($.mobile.activePage.attr("id") == 'badges'){
         getCompletedBadges();
       }
       if($.mobile.activePage.attr("id") == 'friendlist'){
         getFriends();
       }
       if($.mobile.activePage.attr("id") == 'profile'){
         getUserInfo();
       }
    });
});

// Function to run before page changes
// Prevents user going back to login once signed in
// Prevents user going back once signed out
// Injects data to home page
$(document).on("pagebeforechange", function(e, ob) {
    console.log("pagebeforechange");

    //alert("To :"+ob.toPage[0].id);
    //alert("From :"+ob.options.fromPage[0].id);

    console.log(ob);
    console.log(ob.toPage[0].id);
    //console.log("PAGE CHANGE: "+ob.toPage[0].id);
    if(ob.options.fromPage != undefined){
    console.log(ob.options.fromPage[0].id);
      if (ob.toPage[0].id === "login" && ob.options.fromPage[0].id === "home") {
          if(redirecttologin === true){
              redirecttologin = false;
          } else {
              console.log("blocking the back");
              e.preventDefault();
              history.go(1);
          }
      } else if (ob.toPage[0].id === "home") {
          //setTimeout(function(){getUserInfo()},0100);
       } else if (ob.toPage[0].id === "holding") {
            if(ob.options.fromPage[0].id === "other"){

            } else {
                console.log("blocking the back");
                e.preventDefault();
                //history.go(1);
            }
      }
    }
});

// Facebook web settijgs
if(web==true){
  window.fbAsyncInit = function() {
  FB.init({
    appId      : '483622355081269',
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

FB.Event.subscribe('auth.authResponseChange', function(response) {
    if (response.status === 'connected') {
      console.log('Logged in');
    } else {
            FB.login(function(response) {
       // handle the response
     }, {scope: 'email, publish_actions'});
    }
  });
};
}

// Load the Facebook SDK asynchronously
(function(d){
var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
if (d.getElementById(id)) {return;}
js = d.createElement('script'); js.id = id; js.async = true;
js.src = "//connect.facebook.net/en_US/all.js";
ref.parentNode.insertBefore(js, ref);
}(document));

// Here we run a very simple test of the Graph API after login is successful. 
// This testAPI() function is only called in those cases. 
function testAPI() {
console.log('Welcome!  Fetching your information.... ');
FB.api('/me', function(response) {
  console.log('Good to see you, ' + response.name + '.');
});
}

function closeSuccessMessage(){
	document.getElementById("succesfully-added").style.display = "none";
}

// Call to facebook API to login with facebook
function facebookLogin(){
     FB.api('/me', {fields: 'first_name, last_name, email, id, picture'}, function(response) {
        var first_name = response['first_name'];
      var last_name = response['last_name'];
      var email = response['email'];
      var facebookid = response['id'];
      var fbactions = 1;
        console.log(first_name + " " + last_name);
        FB.api(
        "/me/picture",
        {
            "redirect": false,
            "height": "88",
            "type": "normal",
            "width": "98"
        },
        function (response) {
          if (response && !response.error) {
                  console.log(response);
      var image = response['data']['url'];
      //GOT FIRST,LAST NAMES AND EMAIL
      // Now to check email address with db, if doesn't exist pass paramaters to signup function to sign user up and add to table.
      //If email does exist, log in as that user.

    var xhr, target, changeListener, url, data;
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/checkUsers.php";
    var data = new FormData();

    data.append("email", email);

    console.log("Sending", data);
    console.log(this.test);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var message = response.indexOf("New");
                console.log(message);
                if (message == -1){
                    //alert('1453');
                    submitLoginForm(email, image);
                }
                else {
                    //alert('1457');
                    // User is new so register them
                    submitSignForm(first_name,last_name,email,image,facebookid, fbactions);
                }
            }
        }
    };

    // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
    return false;
          }
        }
    );



    });     
}

//SUBMIT Login FORM
function userSearch(){
    $('#friend-search-results').empty();
  // declaring variables to be used
    var xhr, target, changeListener, url, data;
    var html = '';
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/usersearch.php";
    var form = document.getElementById("userSearchForm");
    var data = new FormData(form);
    data.append("userid",   localStorage.getItem('id'));
    console.log("Sending", data);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var s = "success";
                var message = response.indexOf("failed:");
                console.log(message);
                if (response != ''){
                    var response = JSON.parse(this.responseText);
                    for(var  i= 0; i < response.length; i++){
                        if(response[i]['user'] === true && response.length == 1){
                            html += "<div class='user'>";
                            html += "<div class='name searchname'>No results</div></div>";
                            //document.getElementById("friend-search-results").innerHTML = html;
                        }else if(response[i]['username'] === undefined){
                            //html += "<div class='user'>";
                            //html += "<div class='name searchname'>No results</div></div>";
                            //document.getElementById("friend-search-results").innerHTML = html;
                        }else{
                            html += "<div class='user'>";
                            html += "<div class='friends-image'><img class='newsuserimage newuserfriendimage' src='"+response[i]['image']+"'></div>";
                            //html += "<div class='username'>"+response['username']+" </div>";
                            html += "<div class='name searchname'>"+response[i]['first_name']+" "+response[i]['last_name']+ "</div>";
                            if(response[i]['status'] == undefined){
                                html += "<div class='add"+response[i]['id']+"'><a class='addfriend' href='#' onclick='addFriend("+response[i]['id']+")'>Add friend</a></div>";
                            } else if(response[i]['status'] == 0) {
                                if(response[i]['sent'] == 1){
                                    html += "<div id='search-message'>Friend request sent.</div>";
                                } else {
                                    html += "<div class='acceptfriend' id='search-message accept"+response[i]['id']+"'><a href='#' class='acceptrequest' onclick='acceptRequest("+response[i]['id']+")'>Accept friend request</a></div>";
                                }
                            } else {
                                html += "<div id='search-message'>Friends</div>";
                            }
                            html += "</div>";
                            //document.getElementById("friend-search-results").innerHTML = html;
                        }
                    }
                $('#friend-search-results').append(html);
                }
            }
        }
    };
        // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);



    return false;
}

//Add friend
function addFriend(id){
  // declaring variables to be used
    var xhr, target, changeListener, url, data;

    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/addfriend.php";
    var data = new FormData();
    data.append("id1",   localStorage.getItem('id'));
    data.append("id2", id);
    console.log("Sending", data);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var message = response.indexOf("Succesfully");
                console.log(message);
                if (message == '0'){
                     console.log('this.responseText');
                    // html = '<h1 id="badgeearned">Friend request sent</h1>';
                    // html += '<div id="badge-link" class="close-friend"><a id="close-badge" href="#" onclick="closebadgepopup()">Ok</a></div>';
                    // $('#badgealert').append(html);
                    // $( "#badgealert" ).addClass( "less-height" );
                    // $('#bgfade').fadeIn();
                    // $('#badgealert').fadeIn();
                    $('.add'+id).html('<div id="search-message">Friend request sent.</div>');
                    // Award bade
                    completebadge(11);
                } else {
                     console.log('this.responseText');
                }
            }
        }
    };
        // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);



    return false;
}

// Find users friends
function getFriends(){
  // declaring variables to be used
    var xhr, target, changeListener, url, data;
    var html = "";
    var html2 = "";
    var n = 1;
    var bool = 0;
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/getFriends.php";
    var data = new FormData();
    data.append("id", localStorage.getItem('id'));
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = JSON.parse(this.responseText);
                console.log(response);
                $( "#friend-list" ).empty();
                for(var  i= 0; i < response.length; i++){
                    if(response[i]['confirmed']==0 && response[i]['sent']==0){
                        html2 += "<div class='user' id='user-request'>";
                        html2 += "<div class='friends-image'><a href='goToProfile("+response[i]['id']+")'><img class='newsuserimage' src='"+response[i]['image']+"'</src></a></div>";
                        html2 += "<div class='name' id='name-request'>"+response[i]['first_name']+" "+response[i]['last_name']+ "</div>";
                        html2 += "<div id='search-message'><div class='acceptfriend accept"+response[i]['id']+"'><a href='#' onclick='acceptRequest("+response[i]['id']+")'>Accept friend request</a></div></div>";
                        html2 += "</div>";
                        html2 += "<div style='clear: both;'></div>";
                        bool = 1;
                    }else if(response[i]['confirmed']==0 && response[i]['sent']==1){
                    
                    }else if(response[i]['confirmed']==2){
                        html += "<div class='user'>";
                        html += "<div class='rank'>"+n+"</div>";
                        html += "<div class='friends-image'><a href='goToProfile("+response[i]['id']+")'><img class='newsuserimage' src='"+response[i]['image']+"'</src></a></div>";
                        html += "<div class='name'><a href='goToProfile("+response[i]['id']+")'>You</a></div>";
                        html += "<div class='FP'>"+response[i]['current_fp']+ "</div>";
                        html += "<div style='clear: both;'></div>";
                        html += "</div>";
                        n++;
                    }else {
                        html += "<div class='user'>";
                        html += "<div class='rank'>"+n+"</div>";
                        html += "<div class='friends-image'><a href='goToProfile("+response[i]['id']+")'><img class='newsuserimage' src='"+response[i]['image']+"'</src></a></div>";
                        html += "<div class='name'><a href='goToProfile("+response[i]['id']+")'>"+response[i]['first_name']+ "</a></div>";
                        html += "<div class='FP'>"+response[i]['current_fp']+ "</div>";
                        html += "<div style='clear: both;'></div>";
                        html += "</div>";
                        n++;
                    }
                }
                document.getElementById("friend-list").innerHTML = "<h3>Current Footprint</h3>"+html;
                if(bool ===1){
                    document.getElementById("uncomfirmed-list").innerHTML = "<h3>Friend Requests</h3>"+ html2;
                }
            }
        }
    };
        // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
};

//Accept a friend request
function acceptRequest(id){
    var xhr, target, changeListener, url, data;

    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/acceptRequest.php";
    var data = new FormData();
    data.append("current-id", localStorage.getItem('id'));
    data.append("friend-id", id);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var message = response.indexOf("Succesfully");
                console.log(message);
                if (message != -1){
                    $('.accept'+id).html('You are now freinds.');
                }
                // Award bade
                completebadge(11);
            }
        }
    };
        // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
}

function inArray(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) return true;
    }
    return false;
}

function newsfeed(){
    // declaring variables to be used
    var xhr, target, changeListener, url, data;
    var html = "";
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/newsfeed.php";
    var data = new FormData();
    data.append("id", localStorage.getItem('id'));
    // create a request object
    xhr = new XMLHttpRequest();
    //Generate random numbers
    var arr = []
    while(arr.length < 5){
      var randomnumber=Math.ceil(Math.random()*20)
      var found=false;
      for(var i=0;i<arr.length;i++){
        if(arr[i]==randomnumber){found=true;break}
      }
      if(!found)arr[arr.length]=randomnumber;
    }
    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = JSON.parse(this.responseText);
                console.log(response);
                //console.log(response['feed'][0]['image']);
                console.log(response['news']);
                var n = 0;
                if(response['feed'] != undefined){
                    if(response['feed'].length < 5){
                        var arrnum = response['feed'].length;
                    } else {
                        var arrnum = 5;
                        }
                    //Generate random numbers
                    var arr = []
                    while(arr.length < arrnum){
                      var randomnumber=Math.ceil(Math.random()*response['feed'].length)
                      var found=false;
                      for(var i=0;i<arr.length;i++){
                        if(arr[i]==randomnumber){found=true;break}
                      }
                      if(!found)arr[arr.length]=randomnumber;
                    }
                    var jointlengths = response['feed'].length+arr.length;
                    for(var  i= 0; i < response['feed'].length; i++){
                        //IF NUMBER IN NUMBER ARRAY
                        if (inArray(arr, i)) {
                            html += "<div class='news'>";
                            html += "<div class='news-image'><a href='"+response['news'][n]['url']+"'><img class='newsuserimage' src='http://carbon.jamescobbett.co.uk/www/img/news.png'</src></a></div>";
                            html += "<div class='status'><a class='black' href='"+response['news'][n]['url']+"'>"+response['news'][n]['headline']+"</a></div>";
                            html += "<div class='source'><a href='"+response['news'][n]['url']+"'>"+response['news'][n]['source']+"</a></div>";
                            //html += "<div class='time'>"+response['feed'][i]['timestamp']+"</div></div>";
                            html += "</div>";
                            html += "<div class='line'></div>";
                            html += "<div style='clear: both;'></div>"; 
                            n++;
                        }
                        if(response['feed'][i]['type']==1 && response['feed'][i]['status']==1){
                            html += "<div class='news'>";
                            //if(response['feed'][i]['image'] == null){
                            //    html += "<div class='news-image'><a href='#' onClick='goToProfile("+response['feed'][i]['user_id']+")'><img class='newsuserimage' src='http://carbon.jamescobbett.co.uk/www/img/noprofile.jpg'</src></a></div>";
                            //} else {
                                html += "<div class='news-image'><a href='#' onClick='goToProfile("+response['feed'][i]['user_id']+")'><img class='newsuserimage' src='"+response['feed'][i]['image']+"'</src></a></div>";
                            //}
                            html += "<div class='status'><a onClick='goToProfile("+response['feed'][i]['user_id']+")' href='#'>"+response['feed'][i]['user_name']+"</a> added <a onClick='goToCurrent()' href='#'>"+response['feed'][i]['action_name']+"</a> to their list.";
                            html += "<div class='time'>"+response['feed'][i]['timestamp']+"</div></div>";
                            html += "</div>";
                            html += "<div class='line'></div>";
                            html += "<div style='clear: both;'></div>";
                        }else if(response['feed'][i]['type']==1 && response['feed'][i]['status']==2){
                            html += "<div class='news'>";
                            //if(response['feed'][i]['image'] == null){
                            //    html += "<div class='news-image'><a href='#' onClick='goToProfile("+response['feed'][i]['user_id']+")'><img class='newsuserimage' src='/www/img/noprofile.jpg'</src></a></div>";
                            //} else {
                                html += "<div class='news-image'><a href='#' onClick='goToProfile("+response['feed'][i]['user_id']+")'><img class='newsuserimage' src='"+response['feed'][i]['image']+"'</src></a></div>";
                            //}                        
                            html += "<div class='status'><a onClick='goToProfile("+response['feed'][i]['user_id']+")' href='#'>"+response['feed'][i]['user_name']+"</a> completed <a onClick='goToCurrent()' href='#'>"+response['feed'][i]['action_name']+"</a>.";
                            html += "<div class='time'>"+response['feed'][i]['timestamp']+"</div></div>";
                            html += "</div>";
                            html += "<div class='line'></div>";
                            html += "<div style='clear: both;'></div>";
                        }else if(response['feed'][i]['type']==2 && response['feed'][i]['confirmed']==1){
                            html += "<div class='news'>";
                            //if(response['feed'][i]['image'] == null){
                            //    html += "<div class='news-image'><a href='#' onClick='goToProfile("+response['feed'][i]['user_id']+")'><img class='newsuserimage' src='/www/img/noprofile.jpg'</src></a></div>";
                            //} else {
                                html += "<div class='news-image'><a href='#' onClick='goToProfile("+response['feed'][i]['user_id']+")'><img class='newsuserimage' src='"+response['feed'][i]['image']+"'</src></a></div>";
                            //}                        
                            html += "<div class='status'>You are now friends with <a onClick='goToProfile("+response['feed'][i]['user_id']+")' href='#'>"+response['feed'][i]['first_name']+"</a>.";
                            html += "<div class='time'>"+response['feed'][i]['timestamp']+"</div></div>";
                            html += "</div>";
                            html += "<div class='line'></div>";
                            html += "<div style='clear: both;'></div>";
                        }else if(response['feed'][i]['type']==2 && response['feed'][i]['sent']==0 && response['feed'][i]['confirmed']==0){
                            html += "<div class='news'>";
                            //if(response['feed'][i]['image'] == null){
                            //    html += "<div class='news-image'><a href='#' onClick='goToProfile("+response['feed'][i]['user_id']+")'><img class='newsuserimage' src='/www/img/noprofile.jpg'</src></a></div>";
                            //} else {
                                html += "<div class='news-image'><a href='#' onClick='goToProfile("+response['feed'][i]['user_id']+")'><img class='newsuserimage' src='"+response['feed'][i]['image']+"'</src></a></div>";
                            //}                        
                            html += "<div class='status'><a onClick='goToProfile("+response['feed'][i]['user_id']+")' href='#'>"+response['feed'][i]['first_name']+"</a> sent you a friend request.";
                            html += "<div class='time'>"+response['feed'][i]['timestamp']+"</div>";
                            html += "<div class='acceptfriend accept"+response['feed'][i]['user_id']+"'><a href='#' class='acceptrequest' onclick='acceptRequest("+response['feed'][i]['user_id']+")'>Accept friend request</a></div></div>";
                            html += "</div>";
                            html += "<div class='line'></div>";
                            html += "<div style='clear: both;'></div>";
                        } 
                    }
                }
                for(var  n; n < 5; n++){
                    html += "<div class='news'>";
                    html += "<div class='news-image'><a href='"+response['news'][n]['url']+"'><img class='newsuserimage' src='http://carbon.jamescobbett.co.uk/www/img/news.png'</src></a></div>";
                    html += "<div class='status'><a class='black' href='"+response['news'][n]['url']+"'>"+response['news'][n]['headline']+"</a></div>";
                    html += "<div class='source'><a href='#' onclick='window.open(/'"+response['news'][n]['url']+"/', /'_system/');' >"+response['news'][n]['source']+"</a></div>";
                    //html += "<div class='time'>"+response['feed'][i]['timestamp']+"</div></div>";
                    html += "</div>";
                    html += "<div class='line'></div>";
                    html += "<div style='clear: both;'></div>"; 
                }
                document.getElementById("newsfeed").innerHTML = "<h3 id='newstitle'>News Feed</h3>" +html;
            }
        }
    };
        // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
}

function getProfileInfo(id){
     // declaring variables to be used
    var xhr, target, changeListener, url, data;
    var html = "";
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/getprofile.php";
    var data = new FormData();
    data.append("id", id);
    data.append("user_id", localStorage.getItem('id'));
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = JSON.parse(this.responseText);
                console.log(response);
                console.log(response.first_name);
                $('#profile-name').append(response.first_name +" "+ response.last_name);
                if(response.friends === 1 && response.friends ===1){
                    $('#profile-friend').append("Friends");
                } else if (response.friends === 1 && response.friends === 0 && response.sent === 0){
                    $('#profile-friend').append("<a href='#' onClick='acceptFriend("+response['id']+")' class='accept"+response['id']+" acceptfriend'>Accept request</a>");
                } else if (response.friends === 1 && response.friends === 0 && response.sent === 1){
                    $('#profile-friend').append("Request sent");
                } else if( response.id == localStorage.getItem('id')){

                } else{
                    $('#profile-friend').append("<div class='add"+response['id']+"'><a href='#' onClick='addFriend("+response['id']+")' class='addfriend add'>Add Friend</a></div>");
                }
                $('#profile-img').append('<img src="'+response.image+'">');
                $('#profile-footprint').append("<h1 class='profile-dynamic'>"+Math.round(response.total * 100) / 100+"</h1>");
                $('#profile-reductions').append("<h1 class='profile-dynamic'>"(Math.round((response.total - response.current) * 100) / 100)+"</h1>");
                $('#profile-actions').append("<h1 class='profile-dynamic'>"+response.actions+"</h1>");
                $('#profile-badges').append("<h1 class='profile-dynamic'>"+response.badges+"</h1>");
            }
        }
    };
        // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
}
function fblogin(){
    FB.login(function(response) {
        //alert('1886');
       facebookLogin();
     }, {scope: 'email, publish_actions'});
}

function getFBFriends(){
    // Call to FB API to find friends
    FB.api('/me/friends?fields=installed', {fields: 'installed'}, function(response) {
        if(response.data) {
            console.log(response);
            $.each(response.data,function(index,friend) {
                console.log(friend.name + ' has id:' + friend.id);
                console.log("INSTALLED :" + friend.installed);
                if(friend.installed == true){
                    //document.getElementById('uncomfirmed-list').innerHTML = friend.name + ' has id:' + friend.id;
                        var xhr, target, changeListener, url, data;
                        //setting url to the php code to add comments to the db
                        url = "http://carbon.jamescobbett.co.uk/services/getfbfriends.php";
                        var data = new FormData();
                        data.append("facebookid", friend.id);
                        data.append("id", localStorage.getItem('id'));
                        // create a request object
                        xhr = new XMLHttpRequest();

                        changeListener = function () {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    console.log("Response", this.responseText);
                                    var response = JSON.parse(this.responseText);
                                    console.log(response);
                                    console.log(response.first_name);
                                    if(response.first_name == undefined){

                                    } else {
                                        var html = "<div class='user'>";
                                        html += "<div class='friends-image'><img class='newsuserimage newuserfriendimage' src='"+response['image']+"'></div>";
                                        //html += "<div class='username'>"+response['username']+" </div>";
                                        html += "<div class='name searchname'>"+response['first_name']+" "+response['last_name']+ "</div>";
                                        if(response.confirmed == 0){
                                            html += "<div class='add"+response['id']+"'><a class='add addfriend' href='#' onclick='addFriend("+response['id']+")'>Add friend</a></div>"; 
                                        } else{
                                            html += "<div class='add"+response['id']+"'><div id='search-message'>Friend request sent.</div></div>";
                                        }
                                        document.getElementById('uncomfirmed-list').innerHTML += html;
                                    }
                                }
                            }
                        };
                            // initialise a request, specifying the HTTP method
                        // to be used and the URL to be connected to.
                        xhr.onreadystatechange = changeListener;
                        xhr.open('POST', url, true);
                        //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhr.send(data);
                }
            });
        } else {
            document.getElementById('uncomfirmed-list').innerHTML +='<div id="fb-sign" class="fb-sign-friends"><a href="#" onClick="fblogin();"><img src="http://carbon.jamescobbett.co.uk/www/img/facebooksign.png">Sign in with facebook to see your friends</a></div>';
            
        }
    });
}

// Add event to calendar
function calendarevent(title){
  var today = new Date();
  var startDate = new Date(2014,3,6,18,30,0,0,0); // beware: month 0 = january, 11 = december
  var endDate = new Date(2014,3,6,19,30,0,0,0);
  var title = unescape(title);
  var location = "";
  var notes = "";
  var success = function(message) {
    //alert("Success: " + JSON.stringify(message)); 
  };
  var error = function(message) {
    //alert("Error: " + message); 
  };
  // create an event interactively (only supported on Android)
  window.plugins.calendar.createEventInteractively(title,location,notes,today,today,success,error);
}

function shareaction(){
    // Award bade
    completebadge(13);
    var objectToLike = 'http://samples.ogp.me/488117217965116';
FB.api(
       'me/carboncutter:added',
       'post',
       { carbon_action: objectToLike },
       function(response) {
         if (!response) {
           //alert('Error occurred.');
         } else if (response.error) {
            console.log(response.error.message);
           //document.getElementById('result').innerHTML =
             //'Error: ' + response.error.message;
         } else {
           console.log(
             '<a href=\"https://www.facebook.com/me/activity/' +
             response.id + '\">' +
             'Story created.  ID is ' +
             response.id + '</a>');
         }
       }
    );
}

function closebadgepopup(){
    $('#badgealert').fadeOut();
    $('#bgfade').fadeOut();
    $('#badgealert').empty();
}

function showHome(){
    $( ".con-Home" ).fadeIn( "fast", function() {
        // Animation complete.
    });
    $( ".con-Food" ).fadeOut( "fast", function() {
        // Animation complete.
    });
    $( ".con-Travel" ).fadeOut( "fast", function() {
        // Animation complete.
    });
    $( ".con-Stuff" ).fadeOut( "fast", function() {
        // Animation complete.
    });
    $( '#action-filters'  ).slideUp();
}

// Filter toggles for actions 
function showFood(){
    $( ".con-Home" ).fadeOut( "fast", function() {
        // Animation complete.
    });
    $( ".con-Food" ).fadeIn( "fast", function() {
        // Animation complete.
    });
    $( ".con-Travel" ).fadeOut( "fast", function() {
        // Animation complete.
    });
    $( ".con-Stuff" ).fadeOut( "fast", function() {
        // Animation complete.
    });
    $( '#action-filters'  ).slideUp();
}

function showTravel(){
    $( ".con-Home" ).fadeOut( "fast", function() {
        // Animation complete.
    });
    $( ".con-Food" ).fadeOut( "fast", function() {
        // Animation complete.
    });
    $( ".con-Travel" ).fadeIn( "fast", function() {
        // Animation complete.
    });
    $( ".con-Stuff" ).fadeOut( "fast", function() {
        // Animation complete.
    });
    $( '#action-filters'  ).slideUp();
}

function showStuff(){
    $( ".con-Home" ).fadeOut( "fast", function() {
        // Animation complete.
    });
    $( ".con-Food" ).fadeOut( "fast", function() {
        // Animation complete.
    });
    $( ".con-Travel" ).fadeOut( "fast", function() {
        // Animation complete.
    });
    $( ".con-Stuff" ).fadeIn( "fast", function() {
        // Animation complete.
    });
    $( '#action-filters'  ).slideUp();
}

function showAll(){
    $( ".con-Home" ).fadeIn( "fast", function() {
        // Animation complete.
    });
    $( ".con-Food" ).fadeIn( "fast", function() {
        // Animation complete.
    });
    $( ".con-Travel" ).fadeIn( "fast", function() {
        // Animation complete.
    });
    $( ".con-Stuff" ).fadeIn( "fast", function() {
        // Animation complete.
    });
    $( '#action-filters'  ).slideToggle();
}

function actionmessage(){
    var actions= new Array();
    var a = 0;
    function queryDB(tx) {
                tx.executeSql('SELECT user_actions.action_id, user_actions.status, Actions.id, Actions.action, Actions.description, Actions.reduction, Actions.category FROM user_actions INNER JOIN Actions ON user_actions.action_id=Actions.id', [], querySuccess, errorCB);
            }

            function querySuccess(tx, results) {
                console.log("Returned rows from current_actions = " + results.rows.length);
                var num = results.rows.length;
                // this will be true since it was a select statement and so rowsAffected was 0
                if (!results.rowsAffected) {
                    for(var i = 0; i < results.rows.length; i++){
                        if (results.rows.item(i).status==1){
                            actions[a]=new Array();
                            actions[a]['action']=results.rows.item(i).action;
                            a++;
                        }
                    };
                    if(actions.length > 0){
                        actions.sort(function() { return 0.5 - Math.random() });
                        document.getElementById('actionmessage').innerHTML = actions[0]['action'];
                    } else {
                        document.getElementById('noactions').innerHTML = "You don't have any actions on your list, why not <a href='#' onClick='goToActions()'>add some?</a>";
                    }
                } else {
                    console.log('No rows affected!');
                }
            }

            function errorCB(err) {
            }

        db.transaction(queryDB, errorCB);
}