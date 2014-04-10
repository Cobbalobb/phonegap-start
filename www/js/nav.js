function goToActions(){
	$(':mobile-pagecontainer').pagecontainer('change', 'actions.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}

function goToHome(){
	$(':mobile-pagecontainer').pagecontainer('change', 'home.html', {
			show: function( event, ui ) {console.log("TEETETEETETE")},
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}

function directToHome(){
	$(':mobile-pagecontainer').pagecontainer('change', 'home.html', {
			//  beforeshow: function( event, ui ) {alert('test')}
	        transition: 'fade',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}

function docToHome(){
	//document.location.href = 'index.html';
	//document.getElementById('logbutt').innerHTML="<img src='img/loading.gif'>";
$(':mobile-pagecontainer').pagecontainer('change', 'home.html', {
			//  beforeshow: function( event, ui ) {alert('test')}
	        transition: 'fade',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}

function goToSignup(){
	$(':mobile-pagecontainer').pagecontainer('change', 'signup.html', {
	        transition: 'fade',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}

function goToLogin(){
	$(':mobile-pagecontainer').pagecontainer('change', 'login.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}

function goToAll(){
	$(':mobile-pagecontainer').pagecontainer('change', 'actions.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}

function goToCurrent(){
	$(':mobile-pagecontainer').pagecontainer('change', 'todo.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}

function goToCompleted(){
	$(':mobile-pagecontainer').pagecontainer('change', 'completedactions.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}

function goToFriends(){
	$(':mobile-pagecontainer').pagecontainer('change', 'friendlist.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}

function goToSearch(){
	$(':mobile-pagecontainer').pagecontainer('change', 'friendsearch.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}


function goToBadges(){
	$(':mobile-pagecontainer').pagecontainer('change', 'badges.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}

function goToProfile(id){
	$(':mobile-pagecontainer').pagecontainer('change', 'profile.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true,
	    });
	getProfileInfo(id);
	//alert('test');
}

function goToSettings(){
	$(':mobile-pagecontainer').pagecontainer('change', 'settings.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}

function goToChangePicture(){
	$(':mobile-pagecontainer').pagecontainer('change', 'uploadphoto.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}

function goToChangePassword(){
	$(':mobile-pagecontainer').pagecontainer('change', 'changepassword.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });
}

function goToCalculator(){
	// $(':mobile-pagecontainer').pagecontainer('change', 'calculator.html', {
	//         transition: 'slide',
	//         changeHash: true,
	//         reverse: false,
	//         showLoadMsg: true,
	//         reload: true,
	//     });
	//getProfileInfo(id);
	//alert('test');
	document.location.href = 'calculator.html';
}

function goToFBFriends(){
	$(':mobile-pagecontainer').pagecontainer('change', 'fbfriends.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true,
	    });
}

function goToFBActions(){
	$(':mobile-pagecontainer').pagecontainer('change', 'fbactions.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true,
	    });
}