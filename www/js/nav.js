function goToActions(){
	$(':mobile-pagecontainer').pagecontainer('change', 'actions.html', {
	        transition: 'slide',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });}

function goToSignup(){
	$(':mobile-pagecontainer').pagecontainer('change', 'signup.html', {
	        transition: 'slideup',
	        changeHash: true,
	        reverse: false,
	        showLoadMsg: true,
	        reload: true
	    });}