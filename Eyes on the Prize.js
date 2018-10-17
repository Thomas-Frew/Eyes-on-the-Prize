////Pre-function setup

//Game element location
var box = document.getElementById("box");
var iris = document.getElementById("iris");
var pupil = document.getElementById("pupil");
var coin = document.getElementById("coin");
var coin2 = document.getElementById("coin2");
var powerup = document.getElementById("powerup");

//Initial X and Y position of the character (box) declaration
var xBox = container.offsetWidth / 2;
var yBox = container.offsetHeight / 2;
box.style.left = xBox+"px";
box.style.top = yBox+"px";

//Initial X and Y position of the iris declaration
var xIris = 10;
var yIris = 10;
iris.style.left = xIris+"px";
iris.style.top = yIris+"px";

//Initial X and Y position of the pupil declaration
var xPupil = 7.5;
var yPupil = 7.5;
pupil.style.left = xPupil+"px";
pupil.style.top = yPupil+"px";

//Initial X and Y position of the first coin declaration
var xCoin = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));
var yCoin = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
coin.style.left = xCoin+"px";
coin.style.top = yCoin+"px";

//Initial X and Y position of the second coin declaration
var xCoin2 = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));
var yCoin2 = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
coin2.style.left = xCoin2+"px";
coin2.style.top = yCoin2+"px";

////Initial X and Y position of the powerup declaration
var xPowerup = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));
var yPowerup = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
powerup.style.left = xPowerup+"px";
powerup.style.top = yPowerup+"px";

//Essential variable storage
var gameRunning = true;													//Never make this false!
var eyeSpeed = 1;
var score = 0;
var powerupTimer;

//Score area location and priming for replacement
var scoreSection = document.getElementById("scoreSection");
var scoreBoard = document.getElementById("scoreBoard");
scoreSection.removeChild(scoreBoard);

var newScorePara = document.createElement("h2");
var newScoreNode = document.createTextNode(score);
newScorePara.appendChild(newScoreNode);

var scoreBoard = document.getElementById("scoreBoard");
scoreSection.appendChild(newScorePara);

//Determining Box Speed from screen size
if (container.offsetWidth >= container.offsetHeight) {
	var boxSpeed = Math.ceil(container.offsetWidth / 100);
}
else {
	var boxSpeed = Math.ceil(container.offsetHeight / 100);
}

//Character, coins' and powerup's hitpoint declaration
var xBoxCentre = xBox + (box.offsetWidth / 2);
var yBoxCentre = yBox + (box.offsetHeight / 2);
var xCoinCentre = xCoin + (coin.offsetWidth / 2);
var yCoinCentre = yCoin + (coin.offsetHeight / 2);
var xCoin2Centre = xCoin2 + (coin2.offsetWidth / 2);
var yCoin2Centre = yCoin2 + (coin2.offsetHeight / 2);
var xPowerupCentre = xPowerup + (powerup.offsetWidth / 2);
var yPowerupCentre = yPowerup + (powerup.offsetHeight / 2);
	
//Rule alert display on "Show Rules" click										//Add new rules here
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

//Iris color setup (Randomised)
var eyeColorList = ["#03A1BC", "#CC2936", "#606060", "#FFFF4A", "#58F01A"]						//This is the list of all possible iris colours
var eyeColor = Math.floor(Math.random() * 5);
iris.style.background = eyeColorList[eyeColor];

//Random color and ID setup (Randomised)
var powerupID = Math.ceil(Math.random() * 3);

if (powerupID == 1) {
	powerup.style.background = "#58f01a";										//This is the colour for the speed boost
}
if (powerupID == 2) {
	powerup.style.background = "#CC2936";										//This is the colour for the bomb
}
if (powerupID == 3) {
	powerup.style.background = "#03A1BC";										//This is the colour for the hourglass
}

//Timer creation
var timeLeft = 30													//This starts the game with N seconds
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

//Gameover styling
gameover.style.display = "none";

//Keypress function creation
window.addEventListener("keydown", analyseKeypress, false);								//This is the key function of the game!
	

/////Main Game Loop


//Movement declaration
function analyseKeypress(q) {
	if (gameRunning == true) {											//Checks to see if the game is still running

//Leftward movement
		if (q.keyCode == "37") {
			if(xBox <= 0) {											//Is the character right against the left edge? If so, don't move.
				box.style.left = xBox+"px";	
			}
			
			else {												//Is the character right against the left edge? If not, move.
				xBox -= boxSpeed;									//boxSpeed is the parameter for how fast the box moves.
				box.style.left = xBox+"px";
				
				if(xBox <= 0) {										//Is the character right against the left edge? If so, then move back!
				xBox += boxSpeed;
				box.style.left = xBox+"px";
				}
				
				if (xIris <= 5) {									//Code for the movement of the iris
					iris.style.left = xIris+"px";
				}
				
				else {
					xIris -= eyeSpeed;
					iris.style.left = xIris+"px";
				}
				
				if (xPupil <= 5) {									//Code for the movement of the pupil
					pupil.style.left = xPupil+"px";
				}
				
				else {
					xPupil -= eyeSpeed;
					pupil.style.left = xPupil+"px";
				}
			}
		}

	//Upward movement
		if (q.keyCode == "38") {
			if(yBox <= 0) {											//Is the character right up against the top edge? If so, don't move.
				box.style.top = yBox+"px";
			}
			
			else {												//Is the character right against the top edge? If not, move.
				yBox -= boxSpeed;									//boxSpeed is the parameter for how fast the box moves.
				box.style.top = yBox+"px";
				
				if(yBox <= 0) {										//Is the character right against the top edge? If so, then move back!
				yBox += boxSpeed;
				box.style.top = yBox+"px";
				}
				
				
				if (yIris <= 5) {									//Code for the movement of the iris
					iris.style.top = yIris+"px";
				}
				
				else {
					yIris -= eyeSpeed;
					iris.style.top = yIris+"px";
				}
				
				if (yPupil <= 5) {									//Code for the movement of the pupil
					pupil.style.top = yPupil+"px";
				}
				
				else {
					yPupil -= eyeSpeed;
					pupil.style.top = yPupil+"px";
				}
			}
		}

	//Rightward Movement
		if (q.keyCode == "39") {
			if(xBox >= container.offsetWidth - 50) {							//Is the character right against the right edge? If so, then don't move.
				box.style.left = xBox+"px";
			}
			
			else {												//Is the character right against right edge? If not, move.
				xBox += boxSpeed;									//boxSpeed is the parameter for how fast the box moves.
				box.style.left = xBox+"px";
				
				if(xBox >= container.offsetWidth - 50) {						//Is the character right against the right edge? If so, then move back!
				xBox -= boxSpeed;
				box.style.left = xBox+"px";
				}
				
				if (xIris >= 15) {									//Code for the movement of the iris
					iris.style.left = xIris+"px";
				}
				
				else {
					xIris += eyeSpeed;
					iris.style.left = xIris+"px";
				}
					
				if (xPupil >= 10) {									//Code for the movement of the pupil
					pupil.style.left = xPupil+"px";
				}
				
				else {
					xPupil += eyeSpeed;
					pupil.style.left = xPupil+"px";
				}
			}
		}

	//Downward movement
		if (q.keyCode == "16") {
			if(yBox >= container.offsetHeight - 60) {							//Is the character right up against the bottom edge? If so, don't move.
				box.style.top = yBox+"px";
			}
			
			else {												//Is the character right against the bottom edge? If so, move.
				yBox += boxSpeed;									//boxSpeed is the parameter for how fast the box moves.
				box.style.top = yBox+"px";
				
				if(yBox >= container.offsetHeight - 60) {						//Is the character right against the bottom edge? If so, then move back!
				yBox -= boxSpeed;
				box.style.top = yBox+"px";
				}
				
				
				if (yIris >= 15) {									//Code for the movement of the iris
					iris.style.top = yIris+"px";
				}
				
				else {
					yIris += eyeSpeed;
					iris.style.top = yIris+"px";
				}
				
				if (yPupil >= 10) {									//Code for the movement of the pupil
					pupil.style.top = yPupil+"px";
				}
				
				else {
					yPupil += eyeSpeed;
					pupil.style.top = yPupil+"px";
				}
			}
		}
		
//Hitbox updating
		xBoxCentre = xBox + (box.offsetWidth / 2);
		yBoxCentre = yBox + (box.offsetHeight / 2);
		xCoinCentre = xCoin + (coin.offsetWidth / 2);
		yCoinCentre = yCoin + (coin.offsetHeight / 2);
		xCoin2Centre = xCoin2 + (coin2.offsetWidth / 2);
		yCoin2Centre = yCoin2 + (coin2.offsetHeight / 2);
		xPowerupCentre = xPowerup + (powerup.offsetWidth / 2);
		yPowerupCentre = yPowerup + (powerup.offsetHeight / 2);
		
//Item check initialisation
		itemCheck()
		
	}
}

//Item check declaration
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
				
				xCoin2 = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));		//Randomly re-places the coin
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
				
				xPowerup = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));		//Randomly re-places powerup
				yPowerup = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
				powerup.style.left = xPowerup+"px";
				powerup.style.top = yPowerup+"px";

//Powerup 1, Speed Boost
				if (powerupID == 1) {
					if (container.offsetWidth >= container.offsetHeight) {
						boxSpeed = Math.ceil(container.offsetWidth / 100) * 2;			//Multiplies speed by N
					}
					else {
						boxSpeed = Math.ceil(container.offsetHeight / 100) * 2;
					}
					clearInterval(powerupTimer)
					powerupTimer = setTimeout(powerDown, 10000);
				}
				
//Powerup 2, Bomb					
				if (powerupID == 2) {
					score += 2;
					scoreSection.removeChild(newScorePara);
				
					newScorePara = document.createElement("h2");
					newScoreNode = document.createTextNode(score);
					newScorePara.appendChild(newScoreNode);
					scoreBoard = document.getElementById("scoreBoard");
					scoreSection.appendChild(newScorePara);
					
					xCoin = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));		//Randomly re-places the coin
					yCoin = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
					coin.style.left = xCoin+"px";
					coin.style.top = yCoin+"px";
				
					xCoin2 = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));	//Randomly re-places the coin
					yCoin2 = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
					coin2.style.left = xCoin2+"px";
					coin2.style.top = yCoin2+"px";
				}

//Powerup 3, Time Boost				
				if (powerupID == 3) {
					timeLeft += 3;									//Gives N extra seconds 
				}
		
//Powerup re-determination		
				powerupID = Math.ceil(Math.random() * 3);
				if (powerupID == 1) {
					powerup.style.background = "#58f01a";						//Colour for the speed boost
				}
				if (powerupID == 2) {
					powerup.style.background = "#CC2936";						//Colour for the bomb
				}
				if (powerupID == 3) {
					powerup.style.background = "#03A1BC";						//Colour for the hourglass
				}
			}
		}
	}
}

//Powerup 1's powering down
function powerDown(q) {
	if (container.offsetWidth >= container.offsetHeight) {
		boxSpeed = Math.ceil(container.offsetWidth / 100);							//Brings speed back to normal
	}
	else {
		boxSpeed = Math.ceil(container.offsetHeight / 100);
	}
}
