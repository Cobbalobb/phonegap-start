var serviceURL = "http://carbon.jamescobbett.co.uk/services/";

var users;

 // function getuserList() {
 //  $.ajax({       
 //   type : 'POST',   
 //   url : 'http://carbon.jamescobbett.co.uk/services/getuser.php',
   
 //   dataType:'json',
 //   success : function(data) {       
 //   		console.log(data.items.name);
 //   		$('#name').append(data.items.first_name + ',');

 //          },
 //   error : function(xhr, type) { 
    
 //   }  
 //  }); 
 // }



//SUBMIT REGISTRATION FORM
function submitSignForm(first_name, last_name, email, image,facebookid, fbactions){
  // declaring variables to be used
    var xhr, target, changeListener, url, data;

    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/signup.php";
    
    if (typeof email === 'undefined') {
      //FORM VALIDATION
      var x=document.forms["signForm"]["firstname"].value;
      if (x==null || x=="")
      {
          document.getElementById("failure").innerHTML ="<div id='failureText'><img src='http://carbon.jamescobbett.co.uk/www/img/delete.png' id='cross'> <h1>Oops! You haven't eventered your first name.<h1></div>";      
          jQuery('#failure').slideDown("slow");    
          //$('#emailerror').slideDown("slow");  
          //alert('password error');
          return false;
      }
      var x=document.forms["signForm"]["lastname"].value;
      if (x==null || x=="")
      {
          document.getElementById("failure").innerHTML ="<div id='failureText'><img src='http://carbon.jamescobbett.co.uk/www/img/delete.png' id='cross'> <h1>Oops! You haven't eventered your last name.<h1></div>";      
          jQuery('#failure').slideDown("slow");    
          //$('#emailerror').slideDown("slow");  
          //alert('password error');
          return false;
      }
      var x=document.forms["signForm"]["email"].value;
      if (x==null || x=="")
      {
          document.getElementById("failure").innerHTML ="<div id='failureText'><img src='http://carbon.jamescobbett.co.uk/www/img/delete.png' id='cross'><h1>Oops! You haven't entered an email address.<h1></div>";      
        jQuery('#failure').slideDown("slow");     
          //alert('email error');
          return false;
      }
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      var address = document.forms["signForm"]["email"].value;
      if(reg.test(address) == false) {
        document.getElementById("failure").innerHTML ="<div id='failureText'><img src='http://carbon.jamescobbett.co.uk/www/img/delete.png' id='cross'><h1>Oops! That's not a valaid email address.<h1></div>";      
        jQuery('#failure').slideDown("slow");    
          //alert('not a valid email address');
          return false;
      }
      var x=document.forms["signForm"]["username"].value;
      if (x==null || x=="")
      {
          document.getElementById("failure").innerHTML ="<div id='failureText'><img src='http://carbon.jamescobbett.co.uk/www/img/delete.png' id='cross'> <h1>Oops! You haven't eventered a username.<h1></div>";      
          jQuery('#failure').slideDown("slow");    
          //$('#emailerror').slideDown("slow");  
          //alert('password error');
          return false;
      }
      var x=document.forms["signForm"]["password"].value;
      if (x==null || x=="")
      {
          document.getElementById("failure").innerHTML ="<div id='failureText'><img src='http://carbon.jamescobbett.co.uk/www/img/delete.png' id='cross'> <h1>Oops! You haven't eventered a password.<h1></div>";      
          jQuery('#failure').slideDown("slow");    
          //$('#emailerror').slideDown("slow");  
          //alert('password error');
          return false;
      }
      document.getElementById('logbutt').innerHTML="<img src='img/loading.gif'>";
      var form = document.getElementById("signForm");
      var data = new FormData(form);
    } else {
      var data = new FormData();
      data.append("firstname", first_name);
      data.append("lastname", last_name);
      data.append("email", email);
      data.append("username", first_name+last_name);
      data.append("password", '');
      data.append("image", image);
      data.append("facebookid", facebookid);
      data.append("fbactions", fbactions);
    }
    //var form = document.getElementById("signForm");
    //var data = new FormData(form);
    //var html = document.getElementById("source").innerHTML;
  //data = 'html='+escape(document.getElementById("source").innerHTML);
    console.log("Sending", data);
    console.log(this.test);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var s = "success";
                var message = response.indexOf("exception");
                console.log(message);
                if (message == -1){
                     //$('#failure').slideToggle("slow");                    
                    //document.getElementById("failure").style.display = "block";
                    //document.getElementById("failure").innerHTML ="<div id='failureText'><img src='images/cross.png' id='cross'> <h1>Oops! " + response + "</h1></div>";
                    //alert('success');
                    var response = JSON.parse(this.responseText);
                    console.log(response['email']);
                    login(response['id'], response['first_name'], response['last_name'], response['email'], response['image'], response['facebookid'], response['fbactions']);
                    //set email in local temp storage - use this to query db -HOW?
                      // $.ajax({       
                      //  type : 'POST',   
                      //  url : 'http://carbon.jamescobbett.co.uk/services/getuser.php?email=',
                      //  dataType:'json',
                      //  success : function(data) {       
                      //     console.log(data.items);
                      //     login(data.items.id, data.items.first_name, data.items.last_name, data.items.email);
                      //     //document.location.href = 'index.html';
                      //    // $('#name').append(data.items.first_name + ',');

                      //         },
                      //  error : function(xhr, type) { 
                        
                      //  }  
                      // }); 
                }
                else {
                    document.getElementById("failure").innerHTML ="<div id='failureText'><img src='http://carbon.jamescobbett.co.uk/www/img/delete.png' id='cross'> <h1>Oops! That email address is already in use.<h1></div>";      
                    jQuery('#failure').slideDown("slow");
                    document.getElementById('logbutt').innerHTML='<a href="javascript:void(1);" onclick="submitSignForm()" id="signButton">Sign up</a>'; 
                }
                //result = JSON.parse(this.responseText);
                //injectContent(result.id, form);
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

//SUBMIT Login FORM
function submitLoginForm(email, image){
  // declaring variables to be used
    var xhr, target, changeListener, url, data;

    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/login.php";
    if (typeof email != 'undefined') {
      var data = new FormData();
      data.append("email", email);
      data.append("password", '');
      data.append("image", image);

    } else {
      //FORM VALIDATION
      var x=document.forms["loginForm"]["email"].value;
      if (x==null || x=="")
      {
          document.getElementById("failure").innerHTML ="<div id='failureText'><img src='http://carbon.jamescobbett.co.uk/www/img/delete.png' id='cross'><h1>Oops! You haven't entered an email address.<h1></div>";      
        jQuery('#failure').slideDown("slow");     
          //alert('email error');
          return false;
      }
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      var address = document.forms["loginForm"]["email"].value;
      if(reg.test(address) == false) {
        document.getElementById("failure").innerHTML ="<div id='failureText'><img src='http://carbon.jamescobbett.co.uk/www/img/delete.png' id='cross'><h1>Oops! That's not a valaid email address.<h1></div>";      
        jQuery('#failure').slideDown("slow");    
          //alert('not a valid email address');
          return false;
      }
      var x=document.forms["loginForm"]["password"].value;
      if (x==null || x=="")
      {
          document.getElementById("failure").innerHTML ="<div id='failureText'><img src='http://carbon.jamescobbett.co.uk/www/img/delete.png' id='cross'> <h1>Oops! You haven't eventered a password.<h1></div>";      
          jQuery('#failure').slideDown("slow");    
          //$('#emailerror').slideDown("slow");  
          //alert('password error');
          return false;
      }
      document.getElementById('logbutt').innerHTML="<img src='img/loading.gif'>";
      var form = document.getElementById("loginForm");
      var data = new FormData(form);
    }
    //var form = document.getElementById("loginForm");
    //var data = new FormData(form);
    //var html = document.getElementById("source").innerHTML;
  //data = 'html='+escape(document.getElementById("source").innerHTML);
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
                if (message == -1){
                     //$('#failure').slideToggle("slow");                    
                    //document.getElementById("failure").style.display = "block";
                    //document.getElementById("failure").innerHTML ="<div id='failureText'><img src='images/cross.png' id='cross'> <h1>Oops! " + response + "</h1></div>";
                    //alert('success');
                    var response = JSON.parse(this.responseText);
                    console.log(response['email']);
                    if (typeof image != 'undefined') {
                      login(response['id'], response['first_name'], response['last_name'], response['email'], image, response['facebookid'], response['fbactions']);
                    } else {
                      login(response['id'], response['first_name'], response['last_name'], response['email'], response['image'], response['facebookid'], response['fbactions']);
                    }
                    //set email in local temp storage - use this to query db -HOW?
                      // $.ajax({       
                      //  type : 'POST',   
                      //  url : 'http://carbon.jamescobbett.co.uk/services/login.php?email=',
                      //  dataType:'json',
                      //  success : function(data) {       
                      //     console.log(data.items);
                      //     console.log('adasd');
                      //     login(data.items.id, data.items.first_name, data.items.last_name, data.items.email);
                      //     //document.location.href = 'index.html';
                      //    // $('#name').append(data.items.first_name + ',');

                      //         },
                      //  error : function(xhr, type) { 
                        
                      //  }  
                      // }); 
                }
                else {
                    document.getElementById("failure").innerHTML ="<div id='failureText'><img src='http://carbon.jamescobbett.co.uk/www/img/delete.png' id='cross'> <h1>Oops! Email or password is incorrect.<h1></div>";      
                    jQuery('#failure').slideDown("slow");
                    document.getElementById('logbutt').innerHTML='<a href="javascript:void(1);" onclick="submitLoginForm()" id="signButton" class="ui-link">Sign in</a>'; 
                    return false;
                }
                //result = JSON.parse(this.responseText);
                //injectContent(result.id, form);
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