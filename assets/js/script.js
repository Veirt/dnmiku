$.ajax({
	url: '/assets/php/account.php',
	success: function (data) {
		$('.accounts p').text(data);
	}
});

$.ajax({
	url: '/assets/php/character.php',
	success: function (data) {
		$('.characters p').text(data);
	}
});

$.ajax({
	url: '/assets/php/online.php',
	success: function (data) {
		$('.online p').text(data);
	}
});
