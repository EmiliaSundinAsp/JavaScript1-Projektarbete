

// Globala variabler
let player1 = document.querySelector("#player1");
let player2 = document.querySelector("#player2");

let landingPage = document.querySelector("#landing-page");
let gamePage = document.querySelector("#game-page");

let player1ScoreElement = document.querySelector("#player1-score");
let player2ScoreElement = document.querySelector("#player2-score");

let startButton = document.querySelector(".start-btn");
let endGameButton = document.querySelector("#end-game");

let player1Score = 0;
let player2Score = 0;

const cards = document.querySelectorAll(".memory-card");
let mainSectionElement = document.querySelector(".main-section");

let hasFlippedCard = false;
let lockedBoard = false;

let firstCard;
let secondCard;
let activePlayer;
let cardsCopy;


// Funktion för att visa STARTSIDA (och dölja spelsida)
function showLandingPage() {
	document.getElementById('landing-page').style.removeProperty( 'display' );
	document.getElementById('game-page').style.display = 'none';
}


// Funktion för att visa SPELSIDA (och dölja startsida)
function showGamePage() {
	document.getElementById('game-page').style.display = 'flex';
	document.getElementById('landing-page').style.display = 'none';
}


// Eventlistener på startknapp
startButton.addEventListener('click', gameStart);


// Hämta och spara användarnamn i variabler
let input1 = document.querySelector("#user-name-1");
let input2 = document.querySelector("#user-name-2");
let userName1;
let userName2;


// Funktion som startar spelet om startknapp klickas och användarnamn finns ifyllda (döljer startsida och visar spelsida samt sparar spelarnas användarnamn)
function gameStart() {
	userName1 = input1.value;
	userName2 = input2.value;
	if (userName1 != "" && userName2 != "") {

	showGamePage();
	saveUsernames();
	playerTurn();
	shuffleCards();
	}
	else {
		alert("Please enter user names to play!");
	}
}

// Funktion för att spara användarnamn från startsida till spelsida
function saveUsernames() {
	document.getElementById("player1-name").innerHTML = userName1;
	document.getElementById("player2-name").innerHTML = userName2;
}


// Funktion för att blanda korten
function shuffleCards() {
	// Töm main-section
	mainSectionElement.innerHTML = "";
	// Gör om cards till en array och lägg in i Cardscopy
	let cardsCopy = Array.from(cards);
	// Slumpar ordningen i arrayen CardsCopy
	cardsCopy.sort(function(){
		if (Math.random() > 0.5) {
			return -1;
		}
		else {
			return 1;
		}
	})
	// Går igenom cardsCopy och stoppar in dem i main-section igen
	for (let i = 0; i < cardsCopy.length; i++) {
		mainSectionElement.appendChild(cardsCopy[i]);
	}
}


// Eventlyssnare på memory-cards som kör funktionen turnCard
cards.forEach(card => card.addEventListener('click', turnCard));


endGameButton.addEventListener('click', endGame);


// Funktion som avslutar spel och skickar tillbaka till startsidan
function endGame() {
	showLandingPage();
}


// Funktion för att sätta första spelares tur
function playerTurn() {
	activePlayer = userName1;
	document.getElementById("players-turn").innerHTML = activePlayer;
}


// Funktion för att dela ut poäng
function awardPoints() {
	if (activePlayer === userName1) {
		player1Score++;
		//player1Score += 1;
		//player1Score = player1Score + 1;
	}
	else {
		player2Score++;
	}
}


// Funktion för att ÄNDRA aktiv spelare
function alternateActivePlayer() {
	if (activePlayer === userName1) {
		activePlayer = userName2;
	} else {
		activePlayer = userName1;
	}
	document.getElementById("players-turn").innerHTML = activePlayer;
}


// Funktion för att få memory-cards att vändas
function turnCard() {
	if (lockedBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if (hasFlippedCard) {
		// Andra klicket, kör funktion för att para ihop kort
		hasFlippedCard = false;
		secondCard = this;
		pairCards();
	}
	else {
		// Första klicket
		hasFlippedCard = true;
		firstCard = this;
	}
}


// Funktion för att kontrollera om korten är likadana
function pairCards() {
	if  (firstCard.dataset.pairing === secondCard.dataset.pairing) {
		// Korten är likadana, ta bort eventlyssnare på kort och tilldela poäng till aktiv spelare
		deactivateCards();
		awardPoints();
		player1ScoreElement.innerHTML = player1Score;
		player2ScoreElement.innerHTML = player2Score;
		isDone();
	}
	else {
		// Korten är ej likadana, ta bort flipklass på kort och byt aktiv spelare
		unflipCards();
		alternateActivePlayer();
	}
}


// Funktion för att ta bort eventlyssnare på kort så inte för många kort kan vändas
function deactivateCards() {
	firstCard.removeEventListener('click', turnCard);
	secondCard.removeEventListener('click', turnCard);

	nextTurn();
}


// Funktion för att vända korten om de inte är likadana
function unflipCards() {
	lockedBoard = true;

	setTimeout(() => {
	firstCard.classList.remove('flip');
	secondCard.classList.remove('flip');

	nextTurn();
	}, 1500);
}


// Funktion för att återställa korten för nästa spelare
function nextTurn() {
	hasFlippedCard = false;
	lockedBoard = false;
	firstCard = null;
	secondCard = null;
}


// Funktion för att kontrollera om alla kort har klickats, i så fall, kör funktion för att utse vinnare
function isDone() {
	if (player1Score + player2Score === 12) {
		declareWinner();
	}
	else {
	return;
	}
}


// Funktion för att utse en vinnare
function declareWinner() {
	if (player1Score > player2Score) {
		alert(userName1 + " är vinnaren")
	}
	else if (player1Score > player2Score) {
		alert(userName2 + " är vinnaren!")
	}
	else {
		alert("Det blev oavgjort!");
	}
}




// TODO
// - Mellanrum mellan "spelar" och spelares namn