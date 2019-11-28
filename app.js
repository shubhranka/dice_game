/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
init();
function changePlayer(){
    current = 0;
    document.querySelector(".player-"+activePlayer+"-panel").classList.toggle('active');
    document.querySelector('#current-'+activePlayer).textContent = current;
    activePlayer = (activePlayer + 1)%2;
    document.querySelector(".player-"+activePlayer+"-panel").classList.toggle('active');
    sixT = 0;
}
document.querySelector(".btn-roll").addEventListener('click',function(){
    if(!flag){
    // 1.Random Number
    var dice1;
    var dice2;
    var i = 0;
    var j = 0;
    var diceDOM = document.getElementsByClassName('dice');
    diceDOM[0].style.display = 'block';
    diceDOM[1].style.display = 'block';
    // 2. Display the result

    dice1 = Math.floor(Math.random()*6) + 1;
    dice2 = Math.floor(Math.random()*6) + 1;
    diceDOM[0].src = 'dice-' + dice1 + '.png';
    diceDOM[1].src = 'dice-' + dice2 + '.png';
    // 3. Update Scores with condition NOT 1
    if(dice1 ===  1 || dice2 === 1){
        // Next Player
        changePlayer();
    }
    else if (dice1 === 6 || dice2 === 6 ){
        if(sixT == 1)
            scores[activePlayer] = 0;
            document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
            changePlayer();
        
        sixT++;
    }
    else{
        sixT = 0;
        current += dice1 + dice2;
        document.querySelector('#current-'+activePlayer).textContent = current;
    }
}
});

document.querySelector(".btn-hold").addEventListener('click',function(){

    if(!flag){
    // Update Players
    scores[activePlayer]+=current;
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

    if(scores[activePlayer] > finalScore){
        document.getElementById('name-'+activePlayer).textContent = "WINNER";
        document.querySelector(".player-"+activePlayer+"-panel").classList.add('winner');

        document.getElementsByClassName("dice")[1].style.display = "none";
        document.getElementsByClassName("dice")[0].style.display = "none";
        flag = 1;
    }
    changePlayer();
}
});

document.getElementsByClassName('btn-new')[0].addEventListener('click',init);


function init(){
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('name-0').textContent = "PLAYER 1";
    document.getElementById('name-1').textContent = "PLAYER 2";
    scores = [0,0];
    activePlayer = 0;
    current = 0;
    flag = 0;
    document.querySelector(".start").style.display = "block";
};

document.querySelector(".data input").addEventListener('keypress',function(e){
    if(e.code === "Enter"){
        finalScore = this.value;
        document.querySelector(".start").style.display = "none";
        flag = 0;
    }
});
var scores,
 activePlayer, 
 current,
 flag =1;
 finalScore = 0;
 sixT = 0;