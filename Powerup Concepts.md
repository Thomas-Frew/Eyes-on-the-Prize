# Powerup Concepts
Powerups are items within [Eyes on the Prize](https://github.com/ThomasFrew/Eyes-on-the-Prize) which assist the player in various ways. This document will detail all the powerups cuirrently in the game, and ideas for powerups which were scrapped.

## Speed Boost: Green (ID: 1)
The first powerup added to EotP and only powerup for a long time, Speed Boosts increase the player's speed by 200% for 10 seconds. They are by far the most intricate of all powerups, using the following code:

```
if (container.offsetWidth >= container.offsetHeight) {
  boxSpeed = Math.ceil(container.offsetWidth / 100) * 2;
}
else {
  boxSpeed = Math.ceil(container.offsetHeight / 100) * 2;
}
clearInterval(powerupTimer)
powerupTimer = setTimeout(powerDown, 10000);

function powerDown(q) {
	if (container.offsetWidth >= container.offsetHeight) {
		boxSpeed = Math.ceil(container.offsetWidth / 100);
	}
	else {
		boxSpeed = Math.ceil(container.offsetHeight / 100);
	}
}
```

## Bomb: Red (ID: 2)
Arguably the best powerup in EotP, the bomb instantly awards the player 2 points but completley scrambles the game area. They have the longest code of all powerups, though this code is very simple:

```
score += 2;
scoreSection.removeChild(newScorePara);

newScorePara = document.createElement("h2");
newScoreNode = document.createTextNode(score);
newScorePara.appendChild(newScoreNode);
scoreBoard = document.getElementById("scoreBoard");
scoreSection.appendChild(newScorePara);

xCoin = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));				//Randomly re-places the coin
yCoin = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
coin.style.left = xCoin+"px";
coin.style.top = yCoin+"px";

xCoin2 = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));			//Randomly re-places the coin
yCoin2 = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
coin2.style.left = xCoin2+"px";
coin2.style.top = yCoin2+"px";
```

## Hourglass: Blue (ID: 3)
The hourglass gives the player 3 extra secodns upon pickup. They need the least amount of code of all the powerup, using only 1 line:
```
timeLeft += 3;
```

## Magnet *(Scrapped)*
Magnets were designed to attract coins and other powerups toward the player at the rate of 2 pixels a second for 10 seconds. This idea isn't inherently bad, but comes with a lot of issues. Not only will the speed of which the items move need to be adjusted according to the screen size, but they will need to change direction relative to the player and use a respective powerDown function. All of these concepts make the magnet way too cumbersome to ever implement.
