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
function submitSignForm(){
  // declaring variables to be used
    var xhr, target, changeListener, url, data;

    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/signup.php";
    var form = document.getElementById("signForm");
    var data = new FormData(form);
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
                    alert('success');
                    //set email in local temp storage - use this to query db -HOW?
                      $.ajax({       
                       type : 'POST',   
                       url : 'http://carbon.jamescobbett.co.uk/services/getuser.php?email=',
                       dataType:'json',
                       success : function(data) {       
                          console.log(data.items);
                          login(data.items.id, data.items.first_name, data.items.last_name, data.items.email);
                          //document.location.href = 'index.html';
                         // $('#name').append(data.items.first_name + ',');

                              },
                       error : function(xhr, type) { 
                        
                       }  
                      }); 
                }
                else {
                    //$('#success').slideDown("slow");                    
                    //document.getElementById("failure").style.display = "none";
                    //document.getElementById("firstName").innerHTML ='<div id="newN"><h6>'+name+'</h6></div><div id="newAL">'+age+', '+location+'</div>';
                    alert('failure');
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