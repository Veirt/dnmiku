fetch("/api/status")
  .then((res) => res.json())
  .then((res) => {
    var game = document.getElementById("gameserver");
    var village = document.getElementById("villageserver");
    game.innerHTML = res.GameStatus;
    if (res.GameStatus === "Online") {
    }
    res.GameStatus === "Online"
      ? game.classList.add("text-green-500")
      : game.classList.add("text-red-500");
    village.innerHTML = res.VillageStatus;
    res.VillageStatus === "Online"
      ? village.classList.add("text-green-500")
      : village.classList.add("text-red-500");
  });
