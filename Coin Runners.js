////Game Setup


//Find where the box iris, pupil, coin is on the HTML Doc
var box = document.getElementById("box");
var iris = document.getElementById("iris");
var pupil = document.getElementById("pupil");
var coin = document.getElementById("coin");

//Declares and sets initial X and Y positions of the box...
var xBox = 650;
var yBox = 260;
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

///Coin (1)
var xCoin = (Math.ceil(Math.random() * 131) + 1) * 10;
var yCoin = (Math.ceil(Math.random() * 44) + 1) * 10;
coin.style.left = xCoin+"px";
coin.style.top = yCoin+"px";

//Coin (2)
var xCoin2 = (Math.ceil(Math.random() * 131) + 1) * 10;
var yCoin2 = (Math.ceil(Math.random() * 44) + 1) * 10;
coin2.style.left = xCoin2+"px";
coin2.style.top = yCoin2+"px";


//Powerup
var xPowerup = (Math.ceil(Math.random() * 131) + 1) * 10;
var yPowerup = (Math.ceil(Math.random() * 44) + 1) * 10;
powerup.style.left = xPowerup+"px";
powerup.style.top = yPowerup+"px";

//Styles gameover to be invisible
gameover.style.color = "black";

//Storing Essential Variables
var boxSpeed = 10;
var eyeSpeed = 1;
var score = 0;
var gameRunning = true;
var timer;

//Locates score area an primes for replacement
var textSection = document.getElementById("textSection");
var scoreSection = document.getElementById("scoreSection");
textSection.removeChild(scoreSection);

var newScorePara = document.createElement("h2");
var newScoreNode = document.createTextNode(score);
newScorePara.appendChild(newScoreNode);

var scoreSection = document.getElementById("scoreSection");
textSection.appendChild(newScorePara);

//Eye Color Setup
var eyeColorList = ["darkblue", "cornflowerblue", "turquoise", "lightgreen", "saddlebrown", "peru", "crimson"];
var eyeColor = Math.floor(Math.random() * 7 + 1);
iris.style.background = eyeColorList[eyeColor];

//Creates a function to detect keypresses
window.addEventListener("keydown", analyseKeypress, false);

//Timer Creation
setTimeout(timeOut, 30000);


/////Main Game Loop


//Declaring a movement
function analyseKeypress(q) {
	if (gameRunning == true) {
//Moving left
		if (q.keyCode == "37") {
			if(xBox <= 1) {					//Is the box 1 or less pixels to from the left? If so, then don't move.
				box.style.left = xBox+"px";
			}
			
			else {							//Otherwise, Move.
				xBox -= boxSpeed;				//boxSpeed is the parameter for how fast the box moves.
				box.style.left = xBox+"px";
				
				if(xBox <= 1) {					//Is the box 1 or less pixels to from the left? If so, then move back.
				xBox += boxSpeed;
				box.style.left = xBox+"px";
				}
				
				if (xIris <= 5) {			//Code for the movement of the iris
					iris.style.left = xIris+"px";
				}
				
				else {
					xIris -= eyeSpeed;
					iris.style.left = xIris+"px";
				}
				
				if (xPupil <= 5) {				//Code for the movement of the pupil
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
			if(yBox <= 1) {					//Is the box 1 or less pixels from the top? If so, then don't move.
				box.style.top = yBox+"px";
			}
			
			else {
				yBox -= boxSpeed;				//boxSpeed is the parameter for how fast the box moves.
				box.style.top = yBox+"px";
				
				if(yBox <= 1) {					//Is the box 1 or less pixels to from the left? If so, then move back.
				yBox += boxSpeed;
				box.style.top = yBox+"px";
				}
				
				
				if (yIris <= 5) {				//Code for the movement of the iris
					iris.style.top = yIris+"px";
				}
				
				else {
					yIris -= eyeSpeed;
					iris.style.top = yIris+"px";
				}
				
				if (yPupil <= 5) {				//Code for the movement of the pupil
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
			if(xBox >= 1300) {					//Is the box 1300 or more pixels from the left? If so, then don't move.
				box.style.left = xBox+"px";
			}
			
			else {
				xBox += boxSpeed;				//boxSpeed is the parameter for how fast the box moves.
				box.style.left = xBox+"px";
				
				if(xBox >= 1300) {					//Is the box 1300 or more pixels to from the left? If so, then move back.
				xBox -= boxSpeed;
				box.style.left = xBox+"px";
				}
				
				if (xIris >= 15) {				//Code for the movement of the iris
					iris.style.left = xIris+"px";
				}
				
				else {
					xIris += eyeSpeed;
					iris.style.left = xIris+"px";
				}
				
				if (xPupil >= 10) {				//Code for the movement of the pupil
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
			if(yBox >= 430) {					//Is the box 484 or more pixels from the top? If so, then don't move.
				box.style.top = yBox+"px";
			}
			
			
			else {
				yBox += boxSpeed;				//boxSpeed is the parameter for how fast the box moves.
				box.style.top = yBox+"px";
				
				if(yBox >= 430) {					//Is the box 430 or more pixels to from the top? If so, then move back.
				yBox -= boxSpeed;
				box.style.top = yBox+"px";
				}
				
				if (yIris >= 15) {				//Code for the movement of the iris
					iris.style.top = yIris+"px";
				}
				
				else {
					yIris += eyeSpeed;
					iris.style.top = yIris+"px";
				}
					
				if (yPupil >= 10) {				//Code for the movement of the pupil
					pupil.style.top = yPupil+"px";
				}
				
				else {
					yPupil += eyeSpeed;
					pupil.style.top = yPupil+"px";
				}
			}
		}	
		itemCheck()
	}
}

//Declaring Coin Detection
function itemCheck(q) {
	if (gameRunning == true) {
		if ((yBox + 25) > (yCoin - 10) && (yBox + 25) < (yCoin + 30)) {
			if ((xBox +25) > (xCoin - 10) && (xBox + 25) < (xCoin + 30)) {
				
				xCoin = (Math.ceil(Math.random() * 131) + 1) * 10;			//Randomly re-places the coin
				yCoin = (Math.ceil(Math.random() * 44) + 1) * 10;
				coin.style.left = xCoin+"px";
				coin.style.top = yCoin+"px";
				
				score += 1;
				textSection.removeChild(newScorePara);
				
				newScorePara = document.createElement("h2");
				newScoreNode = document.createTextNode(score);
				newScorePara.appendChild(newScoreNode);
				scoreSection = document.getElementById("scoreSection");
				textSection.appendChild(newScorePara);
			}
		}
		
		if ((yBox + 25) > (yCoin2 - 10) && (yBox + 25) < (yCoin2 + 30)) {
			if ((xBox +25) > (xCoin2 - 10) && (xBox + 25) < (xCoin2 + 30)) {
				
				xCoin2 = (Math.ceil(Math.random() * 131) + 1) * 10;			//Randomly re-places the coin
				yCoin2 = (Math.ceil(Math.random() * 44) + 1) * 10;
				coin2.style.left = xCoin2+"px";
				coin2.style.top = yCoin2+"px";
				
				score += 1;
				textSection.removeChild(newScorePara);
				
				newScorePara = document.createElement("h2");
				newScoreNode = document.createTextNode(score);
				newScorePara.appendChild(newScoreNode);
				scoreSection = document.getElementById("scoreSection");
				textSection.appendChild(newScorePara);
			}
		}
		
		if ((yBox + 25) > (yPowerup - 10) && (yBox + 25) < (yPowerup + 30)) {
			if ((xBox + 25) > (xPowerup - 10) && (xBox + 25) < (xPowerup + 30)) {
				
				xPowerup = (Math.ceil(Math.random() * 131) + 1) * 10;				//Randomly re-places powerup
				yPowerup = (Math.ceil(Math.random() * 44) + 1) * 10;
				powerup.style.left = xPowerup+"px";
				powerup.style.top = yPowerup+"px";

				boxSpeed = 20;
				clearInterval(timer)
				timer = setTimeout(powerDown, 10000);
			}
		}
	}
}

//Code for poweing down
function powerDown(q) {
	boxSpeed = 10;
}

//Declaring a Time Out and Game Over
function timeOut(q) {
	alert("30 seconds is up! You scored " + score + " points!");
	gameRunning = false;
	gameover.style.color = "red";
}