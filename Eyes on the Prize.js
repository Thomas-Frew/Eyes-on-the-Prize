////Game Setup

//Find where the box iris, pupil, coin is on the HTML Doc
var box = document.getElementById("box");
var iris = document.getElementById("iris");
var pupil = document.getElementById("pupil");
var coin = document.getElementById("coin");

//Declares and sets initial X and Y positions of the box...
var xBox = container.offsetWidth / 2;
var yBox = container.offsetHeight / 2;
box.style.left = xBox+"px";
box.style.top = yBox+"px";

//Iris...
var xIris = 10;
var yIris = 10;
iris.style.left = xIris+"px";
iris.style.top = yIris+"px";

//Pupil...
var xPupil = 7.5;
var yPupil = 7.5;
pupil.style.left = xPupil+"px";
pupil.style.top = yPupil+"px";

//First Coin...
var xCoin = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));
var yCoin = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
coin.style.left = xCoin+"px";
coin.style.top = yCoin+"px";

//Second Coin...
var xCoin2 = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));
var yCoin2 = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
coin2.style.left = xCoin2+"px";
coin2.style.top = yCoin2+"px";

//and Powerup
var xPowerup = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));
var yPowerup = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
powerup.style.left = xPowerup+"px";
powerup.style.top = yPowerup+"px";

//Storing Other Essential Variables
var eyeSpeed = 1;
var score = 0;
var gameRunning = true;
var powerupTimer;

//Locates score area an primes for replacement (following var score)
var scoreSection = document.getElementById("scoreSection");
var scoreBoard = document.getElementById("scoreBoard");
scoreSection.removeChild(scoreBoard);

var newScorePara = document.createElement("h2");
var newScoreNode = document.createTextNode(score);
newScorePara.appendChild(newScoreNode);

var scoreBoard = document.getElementById("scoreBoard");
scoreSection.appendChild(newScorePara);

//Determining Box Speed
if (container.offsetWidth >= container.offsetHeight) {
	var boxSpeed = Math.ceil(container.offsetWidth / 100);
}
else {
	var boxSpeed = Math.ceil(container.offsetHeight / 100);
}

//Declaring the box and items' central position for hitbox detection
var xBoxCentre = xBox + (box.offsetWidth / 2);
var yBoxCentre = yBox + (box.offsetHeight / 2);
var xCoinCentre = xCoin + (coin.offsetWidth / 2);
var yCoinCentre = yCoin + (coin.offsetHeight / 2);
var xCoin2Centre = xCoin2 + (coin2.offsetWidth / 2);
var yCoin2Centre = yCoin2 + (coin2.offsetHeight / 2);
var xPowerupCentre = xPowerup + (powerup.offsetWidth / 2);
var yPowerupCentre = yPowerup + (powerup.offsetHeight / 2);
	
// Provides a rule alert on 'Show Rules" click
function alertRules () {
        const RULES = [
				"You play as an eyeball, running around with the arrow keys.",
                "You have 30 seconds to collect as many coins as you can, each worth 1 point.",
                "Green powerups will give you a short speed boost.",
				"Red powerups will give you 2 points, but randomizes the coins' positions",
				"Blue powerups will give you 3 additional seconds.",
        ];

        let ruleOutput = "Rules:\n";
        RULES.forEach(rule => {
                ruleOutput += rule + "\n";
        })

        alert(ruleOutput);
}

//Random Color Setup
var eyeColorList = ["#03A1BC", "#CC2936", "#606060", "ffff4a", "#58f01a"]
var eyeColor = Math.floor(Math.random() * 5);
iris.style.background = eyeColorList[eyeColor];

//Random Powerup Setup
var powerupID = Math.ceil(Math.random() * 3);

if (powerupID == 1) {
	powerup.style.background = "#58f01a";
}

if (powerupID == 2) {
	powerup.style.background = "#CC2936";
}

if (powerupID == 3) {
	powerup.style.background = "#03A1BC";
}

//Timer Creation
var timeLeft = 30
setInterval(countSec, 1000);

function countSec() {
	if (gameRunning == true) {
		timeLeft -= 1
			if (timeLeft < 1) {
			timeOut()
		}
	}
}

function timeOut(q) {
	alert("Your time is up! You scored " + score + " points!");
	gameRunning = false;
	gameover.style.display = "inline-block";
	scoreSection.style.display = "none";
}

//Styles gameover to be invisible
gameover.style.display = "none";

//Creates a function to detect keypresses
window.addEventListener("keydown", analyseKeypress, false);


/////Main Game Loop


//Declaring a movement
function analyseKeypress(q) {
	if (gameRunning == true) {

//Moving left
		if (q.keyCode == "37") {
			if(xBox <= 0) {							//Is the character right against the left edge? If so, don't move.
				box.style.left = xBox+"px";	
			}
			
			else {									//Otherwise, Move.
				xBox -= boxSpeed;					//boxSpeed is the parameter for how fast the box moves.
				box.style.left = xBox+"px";
				
				if(xBox <= 0) {						//Is the character right against the left edge? If so, then move back!
				xBox += boxSpeed;
				box.style.left = xBox+"px";
				}
				
				if (xIris <= 5) {					//Code for the movement of the iris
					iris.style.left = xIris+"px";
				}
				
				else {
					xIris -= eyeSpeed;
					iris.style.left = xIris+"px";
				}
				
				if (xPupil <= 5) {					//Code for the movement of the pupil
					pupil.style.left = xPupil+"px";
				}
				
				else {
					xPupil -= eyeSpeed;
					pupil.style.left = xPupil+"px";
				}
			}
		}

	//Moving up
		if (q.keyCode == "38") {
			if(yBox <= 0) {							//Is the character right up against the top edge? If so, don't move.
				box.style.top = yBox+"px";
			}
			
			else {
				yBox -= boxSpeed;					//boxSpeed is the parameter for how fast the box moves.
				box.style.top = yBox+"px";
				
				if(yBox <= 0) {						//Is the character right against the top edge? If so, then move back!
				yBox += boxSpeed;
				box.style.top = yBox+"px";
				}
				
				
				if (yIris <= 5) {					//Code for the movement of the iris
					iris.style.top = yIris+"px";
				}
				
				else {
					yIris -= eyeSpeed;
					iris.style.top = yIris+"px";
				}
				
				if (yPupil <= 5) {					//Code for the movement of the pupil
					pupil.style.top = yPupil+"px";
				}
				
				else {
					yPupil -= eyeSpeed;
					pupil.style.top = yPupil+"px";
				}
			}
		}

	//Moving right
		if (q.keyCode == "39") {
			if(xBox >= container.offsetWidth - 50) {		//Is the character right against the right edge? If so, then don't move.
				box.style.left = xBox+"px";
			}
			
			else {
				xBox += boxSpeed;							//boxSpeed is the parameter for how fast the box moves.
				box.style.left = xBox+"px";
				
				if(xBox >= container.offsetWidth - 50) {	//Is the character right against the right edge? If so, then move back!
				xBox -= boxSpeed;
				box.style.left = xBox+"px";
				}
				
				if (xIris >= 15) {							//Code for the movement of the iris
					iris.style.left = xIris+"px";
				}
				
				else {
					xIris += eyeSpeed;
					iris.style.left = xIris+"px";
				}
					
				if (xPupil >= 10) {							//Code for the movement of the pupil
					pupil.style.left = xPupil+"px";
				}
				
				else {
					xPupil += eyeSpeed;
					pupil.style.left = xPupil+"px";
				}
			}
		}

	//Moving down
		if (q.keyCode == "40") {
			if(yBox >= container.offsetHeight - 60) {					//Is the character right against the bottom edge? If so, then don't move.
				box.style.top = yBox+"px";
			}
			
			
			else {
				yBox += boxSpeed;										//boxSpeed is the parameter for how fast the box moves.
				box.style.top = yBox+"px";
				
				if(yBox >= container.offsetHeight - 60) {				//Is the character right against the bottom edge? If so, then move back!
				yBox -= boxSpeed;
				box.style.top = yBox+"px";	
				}
				
				if (yIris >= 15) {										//Code for the movement of the iris
					iris.style.top = yIris+"px";
				}
				
				else {
					yIris += eyeSpeed;
					iris.style.top = yIris+"px";
				}
					
				if (yPupil >= 10) {										//Code for the movement of the pupil
					pupil.style.top = yPupil+"px";
				}
				
				else {
					yPupil += eyeSpeed;
					pupil.style.top = yPupil+"px";
				}
			}
		}	
		
//Updating the box and items' central position for hitbox detection
		xBoxCentre = xBox + (box.offsetWidth / 2);
		yBoxCentre = yBox + (box.offsetHeight / 2);
		xCoinCentre = xCoin + (coin.offsetWidth / 2);
		yCoinCentre = yCoin + (coin.offsetHeight / 2);
		xCoin2Centre = xCoin2 + (coin2.offsetWidth / 2);
		yCoin2Centre = yCoin2 + (coin2.offsetHeight / 2);
		xPowerupCentre = xPowerup + (powerup.offsetWidth / 2);
		yPowerupCentre = yPowerup + (powerup.offsetHeight / 2);
		
		itemCheck()
		
	}
}

//Declaring Coin Detection
function itemCheck(q) {
	if (gameRunning == true) {
		if ((yBoxCentre) > (yCoinCentre - 35) && (yBoxCentre) < (yCoinCentre + 35)) {
			if ((xBoxCentre) > (xCoinCentre - 35) && (xBoxCentre) < (xCoinCentre + 35)) {
				
				xCoin = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));			//Randomly re-places the coin
				yCoin = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
				coin.style.left = xCoin+"px";
				coin.style.top = yCoin+"px";
				
				score += 1;
				scoreSection.removeChild(newScorePara);
				
				newScorePara = document.createElement("h2");
				newScoreNode = document.createTextNode(score);
				newScorePara.appendChild(newScoreNode);
				scoreBoard = document.getElementById("scoreBoard");
				scoreSection.appendChild(newScorePara);
			}
		}
		
		if ((yBoxCentre) > (yCoin2Centre - 35) && (yBoxCentre) < (yCoin2Centre + 35)) {
			if ((xBoxCentre) > (xCoin2Centre - 35) && (xBoxCentre) < (xCoin2Centre + 35)) {
				
				xCoin2 = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));			//Randomly re-places the coin
				yCoin2 = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
				coin2.style.left = xCoin2+"px";
				coin2.style.top = yCoin2+"px";
				
				score += 1;
				scoreSection.removeChild(newScorePara);
				
				newScorePara = document.createElement("h2");
				newScoreNode = document.createTextNode(score);
				newScorePara.appendChild(newScoreNode);
				scoreBoard = document.getElementById("scoreBoard");
				scoreSection.appendChild(newScorePara);
			}
		}
		
		if ((yBoxCentre) > (yPowerupCentre - 35) && (yBoxCentre) < (yPowerupCentre + 35)) {
			if ((xBoxCentre) > (xPowerupCentre - 35) && (xBoxCentre) < (xPowerupCentre + 35)) {
				
				xPowerup = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));				//Randomly re-places powerup
				yPowerup = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
				powerup.style.left = xPowerup+"px";
				powerup.style.top = yPowerup+"px";

//Powerup 1 (Speed Boost)
				if (powerupID == 1) {
					if (container.offsetWidth >= container.offsetHeight) {
						boxSpeed = Math.ceil(container.offsetWidth / 100) * 2;
					}
					else {
						boxSpeed = Math.ceil(container.offsetHeight / 100) * 2;
					}
					clearInterval(powerupTimer)
					powerupTimer = setTimeout(powerDown, 10000);
				}
				
//Powerup 2 (Score Boost & Randomization)					
				if (powerupID == 2) {
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
				}

//Powerup 3 (Time Boost)				
				if (powerupID == 3) {
					timeLeft += 3;
				}
		
//Powerup re-determination		
				powerupID = Math.ceil(Math.random() * 3);
				if (powerupID == 1) {
					powerup.style.background = "#58f01a";
				}
				if (powerupID == 2) {
					powerup.style.background = "#CC2936";
				}
				if (powerupID == 3) {
					powerup.style.background = "#03A1BC";
				}
			}
		}
	}
}

//Code for Powerup 1's powering down
function powerDown(q) {
	if (container.offsetWidth >= container.offsetHeight) {
		boxSpeed = Math.ceil(container.offsetWidth / 100);
	}
	else {
		boxSpeed = Math.ceil(container.offsetHeight / 100);
	}
}
