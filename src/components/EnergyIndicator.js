import React, { useState, useEffect } from 'react';

function EnergyIndicator() {
    const [characterInfo, setCharacterInfo] = useState(undefined) 
    const [maxEnergy, setMaxEnergy] = useState(0) 
    const [currentEnergy, setCurrentEnergy] = useState(0) 

    useEffect(() => {
    fetch("http://localhost:9292/characters")
        .then((r) => r.json())
        .then(gameCharArray => setCharacterInfo(gameCharArray[0]));
    }, []);


    // return a hp bar, partially filled up to a point indicated by current HP
    return (
        <div>
            <h2> 
                {characterInfo ? `Energy = ${characterInfo.current_energy}/${characterInfo.max_energy}` : null}
            </h2>
        </div>
    );
}


export default EnergyIndicator;