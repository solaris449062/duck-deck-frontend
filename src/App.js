import React, { useState, useEffect } from 'react';
import HpBar from './components/hpBar';
import EnergyIndicator from './components/EnergyIndicator';
import Deck from './components/Deck'
import Hand from './components/Hand'
import EndTurn from './components/EndTurn';
import Restart from './components/Restart';


function App() {

  const [characterInfo, setCharacterInfo] = useState([]) 
  const [allCards, setAllCards] = useState(undefined) 
  const [cardInUse, setCardInUse] = useState(undefined)
  const [cardUseStatus, setCardUseStatus] = useState(0)
  const [cardAddStatus, setCardAddStatus] = useState(0)
  const [turnCounter, setTurnCounter] = useState(1)
  const [turnCounterNoReset, setTurnCounterNoReset] = useState(0)
  const [gameStatus, setGameStatus] = useState(`Turn ${turnCounter}`) 
  const [winStatus, setWinStatus] = useState("") 
  const [restartStatus, setRestartStatus] = useState(0) 

  function handleHandCardClick(id) {
    setCardInUse(id)
    setCardUseStatus(cardUseStatus + 1)
  }


  function handleEndTurn() {
    console.log("function handleEndTurn called")
    setTurnCounter(turnCounter + 1)
    setTurnCounterNoReset(turnCounterNoReset + 1)
    setGameStatus(`Turn ${turnCounter}`) // need to fix this part with callback function
    console.log(turnCounter)
  }

  function gameStatusMessage() {
    return (
      <>
        <h1 className="game_status_message">
          {gameStatus}
        </h1>
        <h1 className="game_status_message">
          {winStatus}
        </h1>
      </>  
    )
  }

  // ending turn and enemy turn begins
  useEffect(() => {
    fetch("http://localhost:9292/end_turn")
        .then((r) => r.json())
        .then(characterStatusArray => {
          setCharacterInfo(characterStatusArray)
          if (characterStatusArray[0].current_HP <= 0) {
            console.log("You Died")
            setWinStatus("You Died")
          }
        })
        .then(() => console.log("turn ended"))
  }, [turnCounterNoReset]);

  // player using card
  useEffect(() => {
    fetch(`http://localhost:9292/play_card/${cardInUse}`)
        .then((r) => r.json())
        .then(characterStatusArray => {
          setCharacterInfo(characterStatusArray)
          if (characterStatusArray[1].current_HP <= 0) {
            setWinStatus("You Win!")
          }
        });
    
  }, [cardUseStatus]);

  // player using card at front-end

  // load character info
  useEffect(() => {
    fetch("http://localhost:9292/characters")
        .then((r) => r.json())
        .then(gameCharArray => setCharacterInfo(gameCharArray));
    }, []);
    // console.log(characterInfo)

  // load all cards
  useEffect(() => {
    fetch("http://localhost:9292/cards")
        .then((r) => r.json())
        .then(allCardsArray => setAllCards(allCardsArray));
  }, []);
    // console.log(allCards)

  // set hand (for now, this is equivalent to all cards, but later implement choice to form deck)

  // console.log(allCards)
  let deckCards;
  let handCards;
  function assignCards() {
    if (allCards) {
      deckCards = allCards.filter(card => card.subset === "deck")
      // console.log(deckCards)
    }
    if (allCards) {
      handCards = allCards.filter(card => card.subset === "hand")
      // console.log(handCards)
    }
  }
  assignCards()


  // play the cards. The function takes three arguments,
  function playCard(cardID, userStatus, targetStatus) {
    // detect which card is played (clicked)
    const cardToPlay = handCards.find(card => card.id == cardID)
    // take action according to the card
    // console.log(characterInfo)
    // console.log(characterInfo[0])
    // console.log(userStatus.max_HP) 
    // console.log(targetStatus)
    // console.log(userStatus.max_hp)
    // if win/lose condition is met, let the player win/lose
    // update character data to the database
  }

  // game start over

  function gameRestart(character) {
    fetch(`http://localhost:9292/characters/${character.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        current_energy: character.max_energy,
        current_HP: character.max_HP,
        shield: 0,
      }),
    })
      .then((r) => r.json())
      .then(json => console.log(json))

    fetch(`http://localhost:9292/cards`, {
      method: "DELETE"
    })
      .then((r) => r.json())
      .then(json => console.log(json)) 
    window.location.reload() // temporary patch
  }

  function handleRestart() {
    setRestartStatus(restartStatus + 1)
  }

  // restart useEffect
  useEffect(() => {
    characterInfo.forEach(character => {
      gameRestart(character)
      setTurnCounter(1)
    })
  }, [restartStatus]);

  // add card to hand
  // addCardToHand(allCards[0])
  // addCardToHand()
  // console.log(allCards[0])


  function handleDeckCardClick(id) {
    setCardInUse(id)
    console.log(cardInUse)
    setCardAddStatus(cardAddStatus + 1)
  }

  function addCardToHand(card) {
    if (card) {
      // console.log(card)
      fetch(`http://localhost:9292/hand`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: card.name,
          cost: card.cost,
          damage: card.damage,
          shield: card.shield,
          heal: card.heal
        }),
      })
        .then((r) => r.json())
        // .then(json => console.log(json))
      }
  }

  useEffect(() => {
    if (allCards) {
    let card = allCards.find(card => card.id == cardInUse)
    // console.log(card)
    addCardToHand(card)
    assignCards()
    window.location.reload() // temporary patch
    }
  }, [cardAddStatus]);


  return (
    <div className="App">
      <h1>Deck Building Card Game</h1>
      <HpBar characterInfo={characterInfo}/>
      <EnergyIndicator characterInfo={characterInfo}/>
      <Hand 
        handleCardClick={handleHandCardClick}
        handCards={handCards}
      />
      <Deck 
        handleCardClick={handleDeckCardClick}
        deckCards={deckCards}
      />
      <EndTurn handleEndTurn={handleEndTurn}/>
      {gameStatusMessage()}
      <Restart handleRestart={handleRestart}/>
    </div>
  );
}

export default App;
