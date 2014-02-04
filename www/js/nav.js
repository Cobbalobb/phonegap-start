function goToActions(){
$(':mobile-pagecontainer').pagecontainer('change', 'action.html', {
        transition: 'slide',
        changeHash: true,
        reverse: false,
        showLoadMsg: true,
        reload: true
    });}