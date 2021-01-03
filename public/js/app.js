function update() {
	$('#datetime').html(moment().format('h:mm:ss A')); // January 2nd 2021, 3:29:53 pm;
}

setInterval(update, 1000);
