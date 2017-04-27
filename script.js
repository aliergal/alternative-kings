
//Global Variables
var dealIndex = 0;
var numOfPickedCards = 0;
var card_picked = false;
var cards = create_cards();
var cards = shuffle_cards(cards);
var newCards = [];


/*
	Function to create a new deck of cards
*/
function create_cards(){
	var cards = [];
	for (var i = 0; i < 4; i++ ){
		for (var j = 1; j <= 13; j++ ){
			var suit = '';
			if(i==0) suit = 'clubs';
			if(i==1) suit = 'hearts';
			if(i==2) suit = 'spades';
			if(i==3) suit = 'diamonds';

			if(j<11) cards.push(j+ '_of_' +suit);
			if(j==11) cards.push('jack_of_' +suit);
			if(j==12) cards.push('queen_of_' +suit);
			if(j==13) cards.push('king_of_' +suit);			
		}
	}
	return cards;
}

/*
	Function to shuffle the deck of cards
*/
function shuffle_cards(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
	Function to turn three cards a time
*/
function turn_cards(array){

	roundEnd = 55 - numOfPickedCards;
	openIndex = dealIndex + 3;
	dealIndex += 3;

	var openedCards = array.slice(openIndex - 3, openIndex);

	$.each(openedCards, function( index, value ) {
	  	newCards.push(value);
	});

	console.log(numOfPickedCards);

	if(dealIndex < roundEnd){
		console.log(newCards);
		var lastCard = newCards.slice(newCards.length - 1, newCards.length);
		lastCard = lastCard[0];
		var selector = '#openedCard';
		replace_card_image(lastCard,selector);
	}else{
		if(card_picked){
			reset_round();
		}else{
			end_game();
		}
		
	}
	
	//return cards;	
}

/*
	Pick the top card from opened deck
*/
function pick_card(d = 1){
	numOfPickedCards++;

	var pickedCard = newCards.slice(newCards.length - 1, newCards.length);
	pickedCard = pickedCard[0];
	newCards = newCards.slice(0, newCards.length - 1);

	var type = '';


	if (pickedCard.search("spades") >= 0) type = 's';
	if (pickedCard.search("hearts") >= 0) type = 'h';
	if (pickedCard.search("clubs") >= 0) type = 'c';
	if (pickedCard.search("diamonds") >= 0) type = 'd';

	if(d == 2){
		if (pickedCard.search("spades") >= 0) type = 's2';
		if (pickedCard.search("hearts") >= 0) type = 'h2';
		if (pickedCard.search("clubs") >= 0) type = 'c2';
		if (pickedCard.search("diamonds") >= 0) type = 'd2';
	}

	if(type == 's') replace_card_image(pickedCard,'#spades');
	if(type == 's2') replace_card_image(pickedCard,'#spades2');
	if(type == 'h') replace_card_image(pickedCard,'#hearts');
	if(type == 'h2') replace_card_image(pickedCard,'#hearts2');
	if(type == 'c') replace_card_image(pickedCard,'#clubs');
	if(type == 'c2') replace_card_image(pickedCard,'#clubs2');
	if(type == 'd') replace_card_image(pickedCard,'#diamonds');
	if(type == 'd2') replace_card_image(pickedCard,'#diamonds2');

	var lastCard = newCards.slice(newCards.length - 1, newCards.length);
	lastCard = lastCard[0];
	var selector = '#openedCard';
	if(newCards.length == 0){
		replace_card_image('empty',selector);
	}else{
		replace_card_image(lastCard,selector);
	}
	card_picked = true;

	$('#remainingCards').html(52 - numOfPickedCards);
}

function replace_card_image(lastCard,selector){
	cardImageSrc = 'images/cards/'+lastCard+'.png';
	$(selector).attr('src', cardImageSrc);
}

function reset_round(){
	card_picked = false;
	dealIndex = 0;
	cards = newCards;
	newCards = [];
}

function end_game(){
	if(numOfPickedCards == 52){
		alert('You win!');
	}else{
		alert('Game Over!');
	}
}

function reset_game(){
	cards = create_cards();
	cards = shuffle_cards(cards);
	card_picked = false;
	numOfPickedCards = 0;
	dealIndex = 0;
	newCards = [];
	replace_card_image('empty','#openedCard');
	replace_card_image('empty','#spades');
	replace_card_image('empty','#spades2');
	replace_card_image('empty','#hearts');
	replace_card_image('empty','#hearts2');
	replace_card_image('empty','#diamonds');
	replace_card_image('empty','#diamonds2');
	replace_card_image('empty','#clubs');
	replace_card_image('empty','#clubs2');
}





