/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//display main game screen when user click on start game button

var roundScore = [0,0];
var currentScore, activePlayer, startTime, endTime, battlePoint, typeOfPlayer;



document.querySelector('#btn-start').addEventListener('click', function() {
   
    //hiding entry screen and overlay
    document.querySelector('#entryScreen').style.display = 'none';
    document.querySelector('.overlay').setAttribute("style", "transform:scale(0);");
    
    //display main game console
    document.querySelector('.wrapper').style.display='block';
    
    //getting player name from entry screen boxes
    document.querySelector('#name-0').textContent = document.querySelector('#p0').value;
    document.querySelector('#name-1').textContent = document.querySelector('#p1').value;
    
});

//back button functionality

document.querySelector('.btn-back').addEventListener('click', function() {
    
    window.location.reload();
});



//we can call function from here because startGame() is already defined in execution content
//also a call back function when we use it from querySelector('.btn-new');
//set Everything to zero when game start
startGame();

//storing text field value in to variable to get final-score
function textChange(){
    battlePoint = document.querySelector('#battle-point').value;
    if(battlePoint == 0)
        {
            battlePoint=100;
        }
}

function startGame(){
    
document.querySelector('#score-0').textContent = 0;
document.querySelector('#score-1').textContent = 0;
document.querySelector('#current-0').textContent = 0;
document.querySelector('#current-1').textContent = 0;
    document.querySelector('#battle-point').value = '';
    
    //enabling again buttons when user start a new game after decleration of winner
    document.querySelector('.btn-roll').disabled = false;
    document.querySelector('.btn-hold').disabled = false;
    
    //assigning variables value 
   
        startTime = new Date().getTime();
        activePlayer = 0;
        currentScore = 0;
        //battlePoint = document.querySelector('#battle-point').value;
        //console.log(battlePoint);//points to win the game
    
    
    if(typeOfPlayer == 'Single Player'){
        document.querySelector('#name-0').textContent = document.querySelector('#p0').value;
        document.querySelector('#name-1').textContent = 'Computer';
    }else{
        //setting player names
    document.querySelector('#name-0').textContent = document.querySelector('#p0').value;
    document.querySelector('#name-1').textContent = document.querySelector('#p1').value;
    }
    
    //setting active class
    document.querySelector('.player-0-panel').classList.add('active');
}

//new game button functionality
document.querySelector('.btn-new').addEventListener('click', startGame);





/********************************* Play with computer ******************************/

function playComputer(){
    var donot = true; // to get vice versa values for
    
    if(activePlayer == 0){
        
        
    }else{
        
        var randomClick = Math.floor((Math.random() * 4)+2);
    console.log(randomClick);
        var i=0;
        var timevar = setInterval(timeInterval, 1500);
        function timeInterval(){ 
                
                    dice= Math.floor((Math.random() * 6) + 1);
                    document.querySelector('.dice').setAttribute('class', 'dice')
                    document.querySelector('.dice').classList.add('roll-' + dice);
                    document.getElementById('myAudio').play();
            if(dice !==1){
        
        currentScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = currentScore;
        
        //checking for addition of current and global to declare winner instantly
         if(roundScore[activePlayer] + currentScore >= battlePoint){
             
             
                var resultScore = roundScore[activePlayer] + currentScore;
             
                //updating UI
                //document.querySelector('#name-' + activePlayer).textContent = 'Winner';
                document.querySelector('.player-' + activePlayer+ '-panel').classList.toggle('active');
                //winner animation
                //document.querySelector('.player-' + activePlayer+ '-panel').classList.toggle('');
             
                //showing globalScore
                document.querySelector('#score-' + activePlayer).textContent = roundScore[activePlayer] + currentScore;
             
             //using overlay class to show player name with animation 
                document.querySelector('.overlay').setAttribute("style", "width:100%; height:100%; margin: 0px; background-color: rgba(0,0,0,0.9); visibility: visible;");
             
                //result screen with player name and score
                document.querySelector('.congrats').style.display = 'block';
                document.querySelector('#wn').textContent = document.querySelector('#name-' + activePlayer).textContent;
             
                document.querySelector('#points').textContent = resultScore;
                //counting time duration
                endTime = new Date().getTime();
                var timing = Math.floor((endTime - startTime) / 1000);
                document.querySelector('#timing').textContent = timing + 'sec';
                
                
                //calling animation function
                fireworksAnimation();
                
             
                //disabling buttons after the declaration of winners
                document.querySelector('.btn-roll').disabled = true;
                document.querySelector('.btn-hold').disabled = true;
         }
        
    }else{
            
        donot = false;
        
        setTimeout(function(){
            
                document.querySelector('#current-' + activePlayer).textContent = 0;
        
        //toggle active class when dice roll to 1
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        
                //seting current score to 0
                currentScore = 0;
            }, 2000);
        
        
    }
            
//stop time when value of i reached to number of clicks and transfer the turn
i++;
 if(i == randomClick){
       
    clearInterval(timevar);
    console.log('time cleared');
               
     //if computer rolls to 1 then this section will not execute from else part
     
     if(donot == true){
         //adding current score to global score
    roundScore[activePlayer] += currentScore;
     
    //console.log(roundScore[activePlayer]);
    document.querySelector('#score-' + activePlayer).textContent = roundScore[activePlayer];
    
    //check if the current player is winner
    if (roundScore[activePlayer] >= battlePoint) {
        
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
        //disabling buttons after the declaration of winners
        document.querySelector('.btn-roll').disabled = true;
        document.querySelector('.btn-hold').disabled = true;
        
    }else{
        
    //updating UI
        //setting time interval so dice can roll completely before turn move to next player
        setTimeout(function(){
            
            if(activePlayer == 1){
                
            document.querySelector('#current-' + activePlayer).textContent = 0;
            currentScore = 0;
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
            }
            
        
        }, 2000);
     }
    
    
        
    }
                
}  //transfer the turn from computer  
            
}
}
    
        
} //main function closing

        


//roll button functionality

document.querySelector('.btn-roll').addEventListener('click', function (){
   
    //document.getElementById('myAudio').play(); //play dice-roll sound when button is clicked
    
    dice= Math.floor((Math.random() * 6) + 1);
    document.querySelector('.dice').setAttribute('class', 'dice')
    document.querySelector('.dice').classList.add('roll-' + dice);
    //document.querySelector('.dice').src = 'dice-' + dice + '.png';
    
    if(dice !==1){
        
        currentScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = currentScore;
        
        //checking for addition of current and global to declare winner instantly
         if(roundScore[activePlayer] + currentScore >= battlePoint){
             
             
                var resultScore = roundScore[activePlayer] + currentScore;
             
                //updating UI
                //document.querySelector('#name-' + activePlayer).textContent = 'Winner';
                document.querySelector('.player-' + activePlayer+ '-panel').classList.toggle('active');
                //winner animation
                //document.querySelector('.player-' + activePlayer+ '-panel').classList.toggle('');
             
                //showing globalScore
                document.querySelector('#score-' + activePlayer).textContent = roundScore[activePlayer] + currentScore;
             
             //using overlay class to show player name with animation 
                document.querySelector('.overlay').setAttribute("style", "width:100%; height:100%; margin: 0px; background-color: rgba(0,0,0,0.9); visibility: visible;");
             
                //result screen with player name and score
                document.querySelector('.congrats').style.display = 'block';
                document.querySelector('#wn').textContent = document.querySelector('#name-' + activePlayer).textContent;
             
                document.querySelector('#points').textContent = resultScore;
                //counting time duration
                endTime = new Date().getTime();
                var timing = Math.floor((endTime - startTime) / 1000);
                document.querySelector('#timing').textContent = timing + 'sec';
                
                
                //calling animation function
                fireworksAnimation();
                
             
                //disabling buttons after the declaration of winners
                document.querySelector('.btn-roll').disabled = true;
                document.querySelector('.btn-hold').disabled = true;
         }
        
    }else{
        document.querySelector('#current-' + activePlayer).textContent = 0;
        
        
        //toggle active class when dice roll to 1
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        
        //seting current score to 0
        currentScore = 0;
        if(activePlayer == 0){
            //do nothing when player 0 is active
        }else{
            
            if( typeOfPlayer == 'Single Player' && activePlayer == 1){
            
             playComputer();
            }
        }
        
        
    }
    
});

//transfer button functionality

document.querySelector('.btn-hold').addEventListener('click', function (){
   
    //adding current score to global score
    roundScore[activePlayer] += currentScore;
    //console.log(roundScore[activePlayer]);
    document.querySelector('#score-' + activePlayer).textContent = roundScore[activePlayer];
    
    //check if the current player is winner
    if (roundScore[activePlayer] >= battlePoint) {
        
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
        //disabling buttons after the declaration of winners
        document.querySelector('.btn-roll').disabled = true;
        document.querySelector('.btn-hold').disabled = true;
        
    }else{
        
    //updating UI
    document.querySelector('#current-' + activePlayer).textContent = 0;
    currentScore = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        if( typeOfPlayer == 'Single Player' && activePlayer == 1){
            
             playComputer();
        }
   
        
    }
    
            
 
});



//choosing player type
function playerType(){
    typeOfPlayer = document.getElementById('selectPlayer').value;
    
    if(typeOfPlayer == 'Single Player'){
            document.getElementById('p1').style.visibility = 'hidden';
            document.querySelector('.p1').style.display = 'none';
            document.querySelector('#p1').value = 'Computer'
       }else{
           document.getElementById('p1').style.visibility = 'visible';
            document.querySelector('.p1').style.display = 'block';
			document.querySelector('#p1').value = ''
       }
    
}



//javascript fireworks animation
function fireworksAnimation(){
    
    $(function() {
	var numberOfStars = 60;
	
	for (var i = 0; i < numberOfStars; i++) {
	  $('.congrats').append('<div class="blob fa fa-star ' + i + '"></div>');
	}	

	animateText();
	
	animateBlobs();
});

$('.congrats').click(function() {
	//reset animation so it can start from begining
    reset();
	
	animateText();
	
	animateBlobs();
});

function reset() {
	$.each($('.blob'), function(i) {
		TweenMax.set($(this), { x: 0, y: 0, opacity: 1 });
	});
	
	TweenMax.set($('h1'), { scale: 1, opacity: 1, rotation: 0 });
}

function animateText() {
		TweenMax.from($('h1'), 0.8, {
		scale: 0.4,
		opacity: 0,
		rotation: 15,
		ease: Back.easeOut.config(4),
	});
}
	
function animateBlobs() {
	
	var xSeed = _.random(350, 380);
	var ySeed = _.random(120, 170);
	
	$.each($('.blob'), function(i) {
		var $blob = $(this);
		var speed = _.random(1, 3);
		var rotation = _.random(5, 100);
		var scale = _.random(0.8, 1.5);
		var x = _.random(-xSeed, xSeed);
		var y = _.random(-ySeed, ySeed);

		TweenMax.to($blob, speed, {
			x: x,
			y: y,
			ease: Power1.easeOut,
			opacity: 0,
			rotation: rotation,
			scale: scale,
			onStartParams: [$blob],
			onStart: function($element) {
				$element.css('display', 'block');
			},
			onCompleteParams: [$blob],
			onComplete: function($element) {
				$element.css('display', 'none');
			}
		});
	});
}
}

