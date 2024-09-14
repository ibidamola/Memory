"use strict";

$(document).ready(() => {
  // VARIABLES
  let cardGame = [];
  let cards = [];
  let numberOfCards = 48;
  let player = "";
  let numberOfAttempts = 0;
  let numcardsMatched = 0;
  let highScore = localStorage.getItem("highScore") || 0;

  // Display the user interface in a Tabs widget with three tabs
  $("#tabs").tabs();

  // Presetting the Highscore and Player Name when the page loads if they exist
  if (sessionStorage.getItem("HighScore") !== null) {
    $("#high_score").text("High Score: " + sessionStorage.getItem("HighScore"));
  }
  if (sessionStorage.getItem("PlayerName") !== null) {
    $("#player").text("Player: " + sessionStorage.getItem("PlayerName"));
  }

  /***********PRELOAD ALL IMAGES******** */
  const images = [];
  for (let i = 0; i < 24; i++) {
    images.push("/images/card_" + (i + 1) + ".png");
    cards.push("/images/card_" + (i + 1) + ".png");
    console.log(cards[i]);
    
  }

  

  // Preload images
  /*let images = [
    "images/back.png",
    "images/blank.png",
    "images/card_1.png",
    "images/card_2.png",
    "images/card_3.png",
    "images/card_4.png",
    "images/card_5.png",
    "images/card_6.png",
    "images/card_7.png",
    "images/card_8.png",
    "images/card_9.png",
    "images/card_10.png",
    "images/card_11.png",
    "images/card_12.png",
    "images/card_13.png",
    "images/card_14.png",
    "images/card_15.png",
    "images/card_16.png",
    "images/card_17.png",
    "images/card_18.png",
    "images/card_19.png",
    "images/card_20.png",
    "images/card_21.png",
    "images/card_22.png",
    "images/card_23.png",
    "images/card_24.png",
  ];

  for (let i = 0; i < images.length; i++) {
    cards[i] = new Image();
    cards[i].src = images[i];
    console.log(cards[i]);
  }*/
  
  

  /****************CODE BLOCK FOR RANDOM SHUFFLING OF CARDS********************/

  const randomShuffle = (arr) => {
    let currentIndex = arr.length;
    let tempValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      tempValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = tempValue;
    }
    return arr;
  };

  /****************CODE BLOCK TO GENERATE THE GAME BOARD********************/
  const generateGameBoard = () => {
    cardGame = [];
    let cardElmts = "";

    for (let i = 0; i < numberOfCards; i++) {
      const card = {
        id: i,
        image: cards[i % (numberOfCards / 2)],
        cardflipped: false,
        matched: false,
      };
      console.log(card);
      cardGame.push(card);
      cardElmts += `<div class="card" id="card${card.id}"><img src="/images/back.png" class="back"><img src="${card.image}" class="front"></div>`;
    }
    $("#cards").html(cardElmts);
  };

  

  /*******************LOAD SAVED CARD SETTINGS*****************/ 
  const loadSettings = () => {
    player = sessionStorage.getItem("PlayerName") || "";
    numberOfCards = parseInt(sessionStorage.getItem("NumberOfCards")) || 48;
    $("#player_name").val(player);
    $("#num_cards").val(numberOfCards);
    $("#player").text("Player: " + player);
    $("#high_score").text("High Score: " + highScore);
  };

  /***************INITIALIZING THE GAME*********************** */
  const initGame = () => {
    loadSettings();
    numberOfCards = parseInt($("#num_cards").val()); // Convert the value to an integer
    for (let i = 0; i < numberOfCards / 2; i++) {
      cards.push(images[i]);
      cards.push(images[i]);
    }
    cards = randomShuffle(cards);
    generateGameBoard();

    /*$(".card").click(function () {
      let cardId = $(this).attr("id").replace("card", "");
      flipCard(cardId);
      checkForMatch();
    });*/
  };
  initGame();  

  // Saving the number of cards and player name in the session storage
  $("#save_settings").click(() => {
    let playerName = $("#player_name").val();
    let numberOfCards = $("#num_cards").val();

    if (playerName === "") {
      alert("Please enter a Player's name");
    } else {
      sessionStorage.setItem("PlayerName", playerName);
      sessionStorage.setItem("NumberOfCards", numberOfCards);
      $("#player").text("Player: " + playerName);
      $("#high_score").text("High Score: " + highScore);
      location.reload();
    }
  });
});
