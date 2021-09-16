import React, { useState, useEffect } from 'react';
import HpBar from './components/hpBar';
import EnergyIndicator from './components/EnergyIndicator';
import Hand from './components/Hand'
import EndTurn from './components/EndTurn';


function App() {

  const [characterInfo, setCharacterInfo] = useState([]) 
  const [allCards, setAllCards] = useState(undefined) 
  const [cardInUse, setCardInUse] = useState(undefined)
  const [cardStatus, setcardStatus] = useState(undefined)
  const [turnCounter, setTurnCounter] = useState(0)

  function handleCardClick(id) {
    setCardInUse(id)
    setcardStatus(!cardStatus)
  }

  function handleEndTurn() {
    console.log("hi")
    setTurnCounter(turnCounter + 1)
    console.log(turnCounter)
  }

  // ending turn and enemy turn begins
  useEffect(() => {
    fetch("http://localhost:9292/end_turn")
        .then((r) => r.json())
        .then(characterStatusArray => setCharacterInfo(characterStatusArray))
        .then(() => console.log("turn ended"));
  }, [turnCounter]);

  // player using card
  useEffect(() => {
    fetch(`http://localhost:9292/play_card/${cardInUse}`)
        .then((r) => r.json())
        .then(characterStatusArray => setCharacterInfo(characterStatusArray));
  }, [cardStatus]);

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
  let handCards = allCards



  // play the cards. The function takes three arguments,
  function playCard(cardID, userStatus, targetStatus) {
    // detect which card is played (clicked)
    const cardToPlay = handCards.find(card => card.id == cardID)
    // take action according to the card
    console.log(characterInfo)
    // console.log(characterInfo[0])
    console.log(userStatus.max_HP) // this sometimes returns error and sometimes doesn't. WHY??
    console.log(targetStatus)
    // console.log(userStatus.max_hp)
    // if win/lose condition is met, let the player win/lose
    // update character data to the database

  }


  return (
    <div className="App">
      <HpBar characterInfo={characterInfo}/>
      <EnergyIndicator characterInfo={characterInfo}/>
      <Hand 
        handleCardClick={handleCardClick}
        handCards={handCards}
      />
      <EndTurn handleEndTurn={handleEndTurn}/>
    </div>
  );
}

export default App;
