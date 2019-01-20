// Pre-function setup


// Game element location
var box = document.getElementById("box");
var iris = document.getElementById("iris");
var pupil = document.getElementById("pupil");
var coin = document.getElementById("coin");
var coin2 = document.getElementById("coin2");
var powerup = document.getElementById("powerup");

// Initial position setup
var box_xpos = container.offsetWidth / 2;
var box_ypos = container.offsetHeight / 2;
box.style.left = box_xpos+"px";
box.style.top = box_ypos+"px";

var iris_xpos = 10;
var iris_ypos = 10;
iris.style.left = iris_xpos+"px";
iris.style.top = iris_ypos+"px";

var pupil_xpos = 7.5;
var pupil_ypos = 7.5;
pupil.style.left = pupil_xpos+"px";
pupil.style.top = pupil_ypos+"px";

var coin_xpos = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));
var coin_ypos = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
coin.style.left = coin_xpos+"px";
coin.style.top = coin_ypos+"px";

var coin2_xpos = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));
var coin2_ypos = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
coin2.style.left = coin2_xpos+"px";
coin2.style.top = coin2_ypos+"px";

var powerup_xpos = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));
var powerup_ypos = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
powerup.style.left = powerup_xpos+"px";
powerup.style.top = powerup_ypos+"px";

// Essential variable storage
var game_running = true;
var eye_speed = 1;
var score = 0;
var powerup_timer;

// Score area location and priming for replacement
var score_block = document.getElementById("score_block");
var score_text = document.getElementById("score_text");
score_block.removeChild(score_text);

var new_score_paragraph = document.createElement("h2");
var new_score_node = document.createTextNode(score);
new_score_paragraph.appendChild(new_score_node);

var score_text = document.getElementById("score_text");
score_block.appendChild(new_score_paragraph);

// Determining Box Speed from screen size
if (container.offsetWidth >= container.offsetHeight) {
	var box_speed = Math.ceil(container.offsetWidth / 100);
}
else {
	var box_speed = Math.ceil(container.offsetHeight / 100);
}

// Character, coins' and powerup's hitpoint declaration
var box_hitbox_xpos = box_xpos + (box.offsetWidth / 2);
var box_hitbox_ypos = box_ypos + (box.offsetHeight / 2);
var coin_hitbox_xpos = coin_xpos + (coin.offsetWidth / 2);
var coin_hitbox_ypos = coin_ypos + (coin.offsetHeight / 2);
var coin2_hitbox_xpos = coin2_xpos + (coin2.offsetWidth / 2);
var coin2_hitbox_ypos = coin2_ypos + (coin2.offsetHeight / 2);
var powerup_hitbox_xpos = powerup_xpos + (powerup.offsetWidth / 2);
var powerup_hitbox_ypos = powerup_ypos + (powerup.offsetHeight / 2);
	
// Rule alert display on "Show Rules" click
function alert_rules () {
        const RULES = [
				"You play as an eyeball, running around with the arrow keys.",
                		"You have 30 seconds to collect as many coins as you can, each worth 1 point.",
          		     	"Green powerups will give you a short speed boost.",
				"Red powerups will give you 2 points, but randomizes the coins' positions",
				"Blue powerups will give you 3 additional seconds.",
				"Press M to toggle music.",
        ];

        let rule_output = "Rules:\n";
        RULES.forEach(rule => {
                rule_output += rule + "\n";
        })

        alert(rule_output);
}

// Random iris, powerup and song selection
var eye_color_list = ["#03A1BC", "#CC2936", "#606060", "#FFFF4A", "#58F01A"]						//This is the list of all possible iris colours
var eye_color = Math.floor(Math.random() * 5);
iris.style.background = eye_color_list[eye_color];

var powerup_ID = Math.ceil(Math.random() * 3);
switch (powerup_ID) {
	case 1:
		powerup.style.background = "#58f01a";														//This is the colour for the speed boost
		break;
	case 2:
		powerup.style.background = "#CC2936";														//This is the colour for the bomb
		break;
	case 3:
		powerup.style.background = "#03A1BC";														//This is the colour for the hourglass
		break;
	default:
		powerup.style.background = "#FF0000";														//This colour signifies an error
		alert("We've encountered an error! Error Code E001: Powerup styling exception.");	
		break;
}

var song = new Audio('Class Void.mp3');
var song_2 = new Audio('Perseverance.mp3');
var selected_song_ID = Math.ceil(Math.random() * 2);

// Timer creation
var time_left = 30																					//This starts the game with N seconds
setInterval(countSec, 1000);

function countSec() {
	if (game_running) {
		time_left -= 1
			if (time_left < 1) {
			time_out()
		}
	}
}

function time_out() {
	alert("Your time is up! You scored " + score + " points!");
	game_running = false;
	gameover.style.display = "inline-block";
	score_block.style.display = "none";
}

// Gameover styling
gameover.style.display = "none";

// Keypress function creation
window.addEventListener("keydown", analyse_keypress, false);										//This is the key function of the game!


// Main Game Loop


function analyse_keypress(q) {
	if (game_running) {
	
		switch (q.keyCode) {
			case 37:
				move_left();
				break;
			case 38:
				move_up();
				break;
			case 39:
				move_right();
				break;
			case 40:
				move_down();
				break;

			case 77:
				play_song(selected_song_ID);
				break;

			default:
				break;
		}
	update_hitboxes();
	item_check();
	}
}
	
function move_left() {
	if(box_xpos <= 0) {																				//Is the character against the left edge? If so, don't move.
		box.style.left = box_xpos+"px";	
	}

	else {																							//Is the character against the left edge? If not, move.
		box_xpos -= box_speed;																		//box_speed is the parameter for how fast the box moves.
		box.style.left = box_xpos+"px";
		
		if(box_xpos <= 0) {																			//Is the character against the left edge? If so, then move back!
		box_xpos += box_speed;
		box.style.left = box_xpos+"px";
		}

		if (iris_xpos <= 5) {																		//Code for the movement of the iris
			iris.style.left = iris_xpos+"px";
		}
		
		else {
			iris_xpos -= eye_speed;
			iris.style.left = iris_xpos+"px";
		}
		
		if (pupil_xpos <= 5) {																		//Code for the movement of the pupil
			pupil.style.left = pupil_xpos+"px";
		}
		
		else {
			pupil_xpos -= eye_speed;
			pupil.style.left = pupil_xpos+"px";
		}
	}
}

function move_up() {
	if(box_ypos <= 0) {																				//Is the character against the top edge? If so, don't move.
		box.style.top = box_ypos+"px";	
	}
	
	else {																							//Is the character against the top edge? If not, move.
		box_ypos -= box_speed;																		//box_speed is the parameter for how fast the box moves.
		box.style.top = box_ypos+"px";
		
		if(box_ypos <= 0) {																			//Is the character against the top edge? If so, then move back!
		box_ypos += box_speed;
		box.style.top = box_ypos+"px";
		}
		
		
		if (iris_ypos <= 5) {																		//Code for the movement of the iris
			iris.style.top = iris_ypos+"px";
		}
		
		else {
			iris_ypos -= eye_speed;
			iris.style.top = iris_ypos+"px";
		}
		
		if (pupil_ypos <= 5) {																		//Code for the movement of the pupil
			pupil.style.top = pupil_ypos+"px";
		}
		
		else {
			pupil_ypos -= eye_speed;
			pupil.style.top = pupil_ypos+"px";
		}
	}
}

function move_right() {	
	if(box_xpos >= container.offsetWidth - box.offsetWidth) {										//Is the character against the right edge? If so, then don't move.
		box.style.left = box_xpos+"px";
	}
	
	else {																							//Is the character against right edge? If not, move.
		box_xpos += box_speed;																		//box_speed is the parameter for how fast the box moves.
		box.style.left = box_xpos+"px";
		
		if(box_xpos >= container.offsetWidth - box.offsetWidth) {									//Is the character against the right edge? If so, then move back!
		box_xpos -= box_speed;
		box.style.left = box_xpos+"px";
		}
		
		if (iris_xpos >= 15) {																		//Code for the movement of the iris
			iris.style.left = iris_xpos+"px";
		}
		
		else {
			iris_xpos += eye_speed;
			iris.style.left = iris_xpos+"px";
		}
			
		if (pupil_xpos >= 10) {																		//Code for the movement of the pupil
			pupil.style.left = pupil_xpos+"px";
		}
		
		else {
			pupil_xpos += eye_speed;
			pupil.style.left = pupil_xpos+"px";
		}
	}
}

function move_down() {		
	if(box_ypos >= container.offsetHeight - box.offsetHeight) {										//Is the character against the bottom edge? If so, don't move.
		box.style.top = box_ypos+"px";	
	}
		
	else {																							//Is the character against the bottom edge? If so, move.
		box_ypos += box_speed;																		//box_speed is the parameter for how fast the box moves.
		box.style.top = box_ypos+"px";
		
		if(box_ypos >= container.offsetHeight - box.offsetHeight) {									//Is the character against the bottom edge? If so, then move back!
		box_ypos -= box_speed;
		box.style.top = box_ypos+"px";
		}
		
		
		if (iris_ypos >= 15) {																		//Code for the movement of the iris
			iris.style.top = iris_ypos+"px";
		}
		
		else {
			iris_ypos += eye_speed;
			iris.style.top = iris_ypos+"px";
		}
		
		if (pupil_ypos >= 10) {																		//Code for the movement of the pupil
			pupil.style.top = pupil_ypos+"px";
		}
		
		else {
			pupil_ypos += eye_speed;
			pupil.style.top = pupil_ypos+"px";
		}
	}
}
	
function play_song(selected_song_ID) {
	switch (selected_song_ID) {
		case 1:
			song.play();
			break;
		case 2:
			song_2.play();
			break;
		default:
			alert("We've encountered an error! Error Code E002: Song selection exception.");
			break;	
	}
}
	
function update_hitboxes() {
	box_hitbox_xpos = box_xpos + (box.offsetWidth / 2);
	box_hitbox_ypos = box_ypos + (box.offsetHeight / 2);
	coin_hitbox_xpos = coin_xpos + (coin.offsetWidth / 2);
	coin_hitbox_ypos = coin_ypos + (coin.offsetHeight / 2);
	coin2_hitbox_xpos = coin2_xpos + (coin2.offsetWidth / 2);
	coin2_hitbox_ypos = coin2_ypos + (coin2.offsetHeight / 2);
	powerup_hitbox_xpos = powerup_xpos + (powerup.offsetWidth / 2);
	powerup_hitbox_ypos = powerup_ypos + (powerup.offsetHeight / 2);
}

function item_check() {
	if (game_running) {
		detect_coins();
		detect_powerups();
	}
}

function detect_coins() {
		if ((box_hitbox_ypos) > (coin_hitbox_ypos - 35) && (box_hitbox_ypos) < (coin_hitbox_ypos + 35)) {
			if ((box_hitbox_xpos) > (coin_hitbox_xpos - 35) && (box_hitbox_xpos) < (coin_hitbox_xpos + 35)) {
				
				coin_xpos = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));			//Randomly generates the location of the coin
				coin_ypos = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
				coin.style.left = coin_xpos+"px";
				coin.style.top = coin_ypos+"px";
				
				score += 1;
				score_block.removeChild(new_score_paragraph);
				
				new_score_paragraph = document.createElement("h2");
				new_score_node = document.createTextNode(score);
				new_score_paragraph.appendChild(new_score_node);
				score_text = document.getElementById("score_text");
				score_block.appendChild(new_score_paragraph);
			}
		}
	
		if ((box_hitbox_ypos) > (coin2_hitbox_ypos - 35) && (box_hitbox_ypos) < (coin2_hitbox_ypos + 35)) {
			if ((box_hitbox_xpos) > (coin2_hitbox_xpos - 35) && (box_hitbox_xpos) < (coin2_hitbox_xpos + 35)) {
				
				coin2_xpos = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));		//Randomly generates the location of the coin
				coin2_ypos = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
				coin2.style.left = coin2_xpos+"px";
				coin2.style.top = coin2_ypos+"px";
				
				score += 1;
				score_block.removeChild(new_score_paragraph);
				
				new_score_paragraph = document.createElement("h2");
				new_score_node = document.createTextNode(score);
				new_score_paragraph.appendChild(new_score_node);
				score_text = document.getElementById("score_text");
				score_block.appendChild(new_score_paragraph);
			}
		}
}

function detect_powerups() {
if ((box_hitbox_ypos) > (powerup_hitbox_ypos - 35) && (box_hitbox_ypos) < (powerup_hitbox_ypos + 35)) {
			if ((box_hitbox_xpos) > (powerup_hitbox_xpos - 35) && (box_hitbox_xpos) < (powerup_hitbox_xpos + 35)) {
				
				powerup_xpos = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));		//Randomly generates the location of powerup
				powerup_ypos = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
				powerup.style.left = powerup_xpos+"px";
				powerup.style.top = powerup_ypos+"px";

				switch (powerup_ID) {
					case 1:
						powerup_1();
						break;		
					case 2:
						powerup_2();
						break;				
					case 3:
						powerup_3();
						break;
					default:
						alert("We've encountered an error! Error Code E003: Powerup selection exception.");
						break;
					}

				change_powerup();
			}
		}
	}

function powerup_1() {	
	if (container.offsetWidth >= container.offsetHeight) {
			box_speed = Math.ceil(container.offsetWidth / 100) * 2;									//Multiplies speed by N
	}
	else {
		box_speed = Math.ceil(container.offsetHeight / 100) * 2;
	}
	clearInterval(powerup_timer)
	powerup_timer = setTimeout(powerup_1_time_out, 10000);
}

function powerup_1_time_out() {
	if (container.offsetWidth >= container.offsetHeight) {
		box_speed = Math.ceil(container.offsetWidth / 100);											//Brings speed back to normal
	}
	else {
		box_speed = Math.ceil(container.offsetHeight / 100);
	}
}

function powerup_2() {	
	score += 2;
	score_block.removeChild(new_score_paragraph);

	new_score_paragraph = document.createElement("h2");
	new_score_node = document.createTextNode(score);
	new_score_paragraph.appendChild(new_score_node);
	score_text = document.getElementById("score_text");
	score_block.appendChild(new_score_paragraph);

	coin_xpos = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));						//Randomly generates the location of the coin
	coin_ypos = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
	coin.style.left = coin_xpos+"px";
	coin.style.top = coin_ypos+"px";

	coin2_xpos = 20 + (Math.ceil(Math.random() * (container.offsetWidth - 60)));					//Randomly generates the location of the coin
	coin2_ypos = 20 + (Math.ceil(Math.random() * (container.offsetHeight - 60)));
	coin2.style.left = coin2_xpos+"px";
	coin2.style.top = coin2_ypos+"px";
}

function powerup_3() {	
	time_left += 3;
}

function change_powerup() {
	powerup_ID = Math.ceil(Math.random() * 3);

	switch (powerup_ID) {
	case 1:
		powerup.style.background = "#58f01a";														//This is the colour for the speed boost
		break;
	case 2:
		powerup.style.background = "#CC2936";														//This is the colour for the bomb
		break;
	case 3:
		powerup.style.background = "#03A1BC";														//This is the colour for the hourglass
		break;
	default:
		powerup.style.background = "#FF0000";														//This colour signifies an error
		alert("We've encountered an error! Error Code E001: Powerup styling exception.");	
		break;
	}
}
