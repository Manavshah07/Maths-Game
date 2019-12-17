let playing = false;
let score;
let timeremaining;
let countdown;
let correctAnswer;

//HELPER FUNCTIONS

function show(id){
	document.getElementById(id).style.display = 'block';
}
function hide(id){
	document.getElementById(id).style.display = 'none';
}

function setText(id, text){
	document.getElementById(id).innerHTML =text;
}

//END OF HELPER FUNCTION


document.querySelector("#startreset").addEventListener('click',function(){
	//playing =!playing;
	if(playing){
		//You are playing the game and clicked reset button
		
		playing =false;
		location.reload();
		
	}else{
		//You are not playing and clicked start button
		playing = true;
		
		hide("gameover");
		
		score = 0;
		setText("scoreValue",score);
		
		show("timeremaining");
		timeremaining = 40;
		setText("timeremainingValue",timeremaining);
		
		this.innerHTML = "Reset Game";
		startCountdown();
		generateQA();
	}
});

function startCountdown(){
	countdown = setInterval(function(){
		timeremaining -= 1;
		setText("timeremainingValue",timeremaining);
		if(timeremaining<=0){
			clearInterval(countdown);
			
			//as countdown has stopped, it means our game is over!
			
			playing = false;
			setText("startreset","Start Game");
			hide("timeremaining");
			show("gameover");
			setText("gameover","<p>Game Over.</p><p>Your Score: " + score + "</p>");
			hide("scoreValue");
		}
	},1000);
}

function generateQA(){
	let x= 1 + Math.round((Math.random() * 9));
	let y= 1 + Math.round((Math.random() * 9));
	
	correctAnswer = x * y;
	setText("question", x + "x" + y);
	
	let correctPosition  = 1 + Math.round((Math.random() * 3));
	
	//fill correct box with correct answer 
	setText("box"+correctPosition, correctAnswer);
	
	//fill other boxes
	
	let answers = [correctAnswer];
	for(i=1; i<5;i++){
		if(i != correctPosition){
			let wrongAnswer;
			do{
				wrongAnswer = (1 +Math.round((Math.random() * 9)) * (1 + Math.round((Math.random() * 9))));
			}while(answers.indexOf(wrongAnswer) > -1);
			setText("box"+i, wrongAnswer);
			answers.push(wrongAnswer);
		}
	}
}

for(i=1; i<5;i++){
	document.getElementById("box" + i).onclick = function(){
		if(playing){
			if(correctAnswer == this.innerHTML){
				score++;
				setText("scoreValue",score);
				show("correct");
				hide("wrong");
				setTimeout(function(){
					hide("correct");
				},1000);
				generateQA();
			}else{
				show("wrong");
				hide("correct");
				setTimeout(function(){
					hide("wrong");
				},1000);
			}
		}
	}
}
