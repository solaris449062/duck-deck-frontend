import React, { useState, useEffect } from 'react';
import HpBar from './components/hpBar';
import EnergyIndicator from './components/EnergyIndicator';
import Hand from './components/Hand'


function App() {
   
  return (
    <div className="App">
      <HpBar/>
      <EnergyIndicator/>
      <Hand/>
    </div>
  );
}

export default App;
