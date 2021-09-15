import React, { useState, useEffect } from 'react';
import HpBar from './components/hpBar';
import EnergyIndicator from './components/EnergyIndicator';
import Hand from './components/Hand'


function App() {

  const [characterInfo, setCharacterInfo] = useState("") 
  const [cardInUse, setCardInUse] = useState(undefined)
  
  function handleCardClick(id) {
    setCardInUse(id)
  }

  useEffect(() => {
    fetch(`http://localhost:9292/play_card/${cardInUse}`)
        .then((r) => r.json())
        .then(characterStatusArray => setCharacterInfo(characterStatusArray));
  }, [cardInUse]);

  useEffect(() => {
  fetch("http://localhost:9292/characters")
      .then((r) => r.json())
      .then(gameCharArray => setCharacterInfo(gameCharArray[0]));
  }, []);
  console.log(characterInfo)

  return (
    <div className="App">
      <HpBar characterInfo={characterInfo}/>
      <EnergyIndicator characterInfo={characterInfo}/>
      <Hand handleCardClick={handleCardClick}/>
    </div>
  );
}

export default App;
