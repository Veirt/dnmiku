fetch("/api/status")
	.then(function (res) {
		return res.json();
	})
	.then(function (res) {
		var game = document.getElementById("gameserver");
		var village = document.getElementById("villageserver");
		game.innerHTML = res.GameStatus;
		res.GameStatus === "Online"
			? game.classList.add("text-green-500")
			: game.classList.add("text-red-500");
		village.innerHTML = res.VillageStatus;
		res.VillageStatus === "Online"
			? village.classList.add("text-green-500")
			: village.classList.add("text-red-500");
	});
fetch("api/players")
	.then(function (res) {
		return res.json();
	})
	.then(function (res) {
		var accounts = document.getElementById("accounts");
		var characters = document.getElementById("characters");
		var online = document.getElementById("online");
		accounts.innerHTML = res.nowTotalAccount;
		characters.innerHTML = res.nowTotalCharacter;
		online.innerHTML = res.nowOnline;
	});
