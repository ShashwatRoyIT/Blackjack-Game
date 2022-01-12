//challenge->1  Your age in days
function ageInDays(){
    var birthYear=prompt("What is your birth year?")
    var ageInDays = (2021-birthYear)*365;
    var h1 =document.createElement('h1');
    var textAnswer=document.createTextNode('You are'+ageInDays+ " days old");
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);

}
function reset(){
    document.getElementById('ageInDays').remove();
}
//Challenge->2 Generate cats
function generateCat(){
    var image =document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src="https://media1.giphy.com/media/3o6Zt9fiqF4N4VrFok/200w.webp?cid=ecf05e473mfpef5cv4ymwo7b7xedy7racz3cwzxeeip0xtd9&rid=200w.webp&ct=g";
    div.appendChild(image);
}


//Challenge ->3 Rock Paper scessors
function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice,botChoice;
    humanChoice=yourChoice.id;
    botChoice=numberToChoice(randToRpsInt());
    console.log("computer choice : ",botChoice);
    results= decideWinner(humanChoice,botChoice);//[0,1]
    console.log(results);
    message = finalMessage(results); //{'mesage':"You won",'color':green}
    console.log(message);
    rpsFrontEnd(yourChoice.id,botChoice,message);
}

function randToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToChoice(number){
    return['rock','paper','scissors'][number];
}
function decideWinner(yourChoice,computerChoice){
    var rpsDatabase ={
        'rock':{'scissors':1,rock:0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0},
    };
    var yourScore=rpsDatabase[yourChoice][computerChoice];
    var computerScore=rpsDatabase[computerChoice][yourChoice];
    return [yourScore,computerScore];
}

function finalMessage([yourScore]){
    if(yourScore===0){
        return{'message':'You lost','color':'red'};
    }
    else if(yourScore===0.5){
        return {'message':'You tired','color':'yellow'};
    }
    else{
        return {'message':'You Won','color':'green'};
    }
}

function rpsFrontEnd(humanImgChoice,botImgChoice,finalMessage){
    var imageDatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    };
    //remove previous images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    
    var humanDiv= document.createElement('div');
    var botDiv= document.createElement('div');
    var messageDiv= document.createElement('div');
    humanDiv.innerHTML="<img src='"+imageDatabase[humanImgChoice]+"'height=150 width=150 style='box-shadow: 10px 10px 50px rgba(37,50,233,1);'>"
    messageDiv.innerHTML="<h1 style=color:"+finalMessage['color']+"; font-size:60px;padding:30px;'>"+ finalMessage['message']+"</h1>"
    botDiv.innerHTML="<img src='"+imageDatabase[botImgChoice]+"'height=150 width=150 style='box-shadow: 10px 10px 50px rgba(243,38,24,1);'>"
    
 
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}


function reset(){
    document.getElementById('').remove();
}

//Challenge 4


var all_buttons = document.getElementsByTagName('button');
//console.log(all_buttons);
var copyAllbuttons=[];

for(let i=0;i<all_buttons.length;i++){
    copyAllbuttons.push(all_buttons[i].classList[1]);
}
console.log(copyAllbuttons);

function buttonColorChange(buttonThingy){
    if(buttonThingy.value==='red'){
        buttonsRed();
    }
    else if(buttonThingy.value=='green'){
        buttonsGreen();
    }
    else if(buttonThingy.value=='reset'){
        buttonsReset();
    }
    else if(buttonThingy.value=='random'){
        buttonsRandom();
    }
}
function buttonsRed(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }

}

function buttonsGreen(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }

}
function buttonsReset(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllbuttons[i]);
    }
}
function buttonsRandom(){
    var choices=['btn-primary','btn-danger','btn-warning','btn-success']
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[Math.floor(Math.random()*4)]);
    }
}

//Challenge 5

let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false
};

const YOU =blackjackGame['you']
const DEALER= blackjackGame['dealer']
const hitSound =new Audio('newfolder/sounds/swish.m4a');
const winsound=new Audio('newfolder/sounds/cash.mp3');
const lossound = new Audio('newfolder/sounds/aww.mp3');
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);//calling blackjackHit function when #blackjack-hit-button clicked

document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
//event listner
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
    if(blackjackGame['isStand']===false){
        let card = randomCards();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
    }
}
  //Picking random cards
function randomCards(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(cards,activePlayer){
    if(activePlayer['score']<=21){
        let cardImage=document.createElement('img');
        //using string templating to randomly call cards images 
        cardImage.src=`newfolder/images/${cards}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}
function blackjackDeal(){
    if(blackjackGame['turnsOver']===true){
        blackjackGame['isStand']=false;
        //showResult(computeWinner()); 
        let yourImages = document.querySelector('#your-box').querySelectorAll('img'); 
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img'); 
        //console.log(yourImages);
        for(i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        }
        //yourImages[0].remove(); 
        for(i=0;i<dealerImages.length;i++){
            dealerImages[i].remove();
        }
        YOU['score']=0;
        DEALER['score']=0;
        document.querySelector('#your-blackjack-result').textContent=0;
        document.querySelector('#dealer-blackjack-result').textContent=0;

        document.querySelector('#dealer-blackjack-result').style.color='white';
        document.querySelector('#your-blackjack-result').style.color='white';
        
        document.querySelector('#blackjack-result').textContent="Let's play again";
        document.querySelector('#blackjack-result').style.color='black';

        blackjackGame['turnsOver']=true;
    }
}
function updateScore(card,activePlayer){
    //if adding 11 keeps me below 21 add 11 else add 1
    if(card==='A'){
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score']+=blackjackGame['cardsMap'][card][1];
        }else{
            activePlayer['score']+=blackjackGame['cardsMap'][card][0];
        }
    }
    else{
        activePlayer['score']+=blackjackGame['cardsMap'][card]; 
    }
}
function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUSTED!!";
        //document.getElementById("your-blackjack-result").innerHTML="BUSTED!!";
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
        //document.getElementById("your-blackjack-result").style.color='red';
    }
    else{
        //document.getElementById("your-blackjack-result").innerHTML =activePlayer['score'];
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}
function sleep(ms){
    return new Promise(resolve =>setTimeout(resolve,ms));
}

async function dealerLogic(){
    blackjackGame['isStand']=true;
    while(DEALER['score']<16 && blackjackGame['isStand']===true){
        let card =randomCards();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    } 
    //if(DEALER['score]>15)
    blackjackGame['turnsOver']=true;
    showResult(computeWinner());
        
}
//compute who won
//update win looses and draws 
function computeWinner(){
    let winner;
    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score']||DEALER['score']>21){
            //Higher scor than dealer or dealer busts
            blackjackGame['wins']++;
            winner=YOU;
        }
        else if(YOU['score']<DEALER['score']){
            //console.log('you lost!!');
            blackjackGame['losses']++;
            winner=DEALER;
        }
        else if(YOU['score']===DEALER['score']){
            blackjackGame['draws']++;
            //console.log('YOU Drew');
        }
    }
    else if(YOU['score']>21&&DEALER['score']<=21){
        //console.log('You lost!!');
        blackjackGame['losses']++;
        //user burst but dealer doesen't
        winner=DEALER;
    }
    else if(YOU['score']>21&&DEALER['score']>21){
        //when you and dealer busrst
        blackjackGame['draws']++;
        //console.log('you drew!!');
    }
    //console.log('winner is',winner);
    console.log(blackjackGame);
    return winner;
}

function showResult(winner){

    let message,messagecolor;
    if(blackjackGame['turnsOver']===true)
    {
        if(winner===YOU){
            //select id name wins(#wins) and make it = to blackjckgame(object)'s wins
            document.querySelector('#wins').textContent=blackjackGame['wins'];
            message='You Won!!';
            messagecolor='green';
            winsound.play();
        }
        else if(winner===DEALER){
            document.querySelector('#losses').textContent=blackjackGame['losses'];
            message='Computer won!!';
            messagecolor='red';
            lossound.play();
        }
        else{    
            document.querySelector('#draws').textContent=blackjackGame['draws'];
            message='You Drew!';
            messagecolor='black';
        }
        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messagecolor;
    }

}