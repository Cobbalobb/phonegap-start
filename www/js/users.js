var serviceURL = "../services/";

var users;

function getuserList() {
	console.log('test');
	 $.getJSON(serviceURL + 'getuser.php', function(data) {
	 	console.log(data.items.id);
		users = data.items;
		$('#name').append(data.items.name + ',');
				$('json').listview('refresh');

		$.each(users, function(index, user) {
			console.log(user);
			$('json').append('<li><a href="userdetails.html?id=' + user.id + '">' +
					'<h4>' + user.name + ' ' + user.lastName + '</h4>' +
					'<span class="ui-li-count">' + user.reportCount + '</span></a></li>');
		});
		$('json').listview('refresh');
	});
	 console.log('here');
}