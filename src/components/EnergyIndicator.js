import React, { useState, useEffect } from 'react';

function EnergyIndicator({characterInfo}) {
    console.log(characterInfo)

    return (
        <div>
            <h2> 
                {characterInfo[0] ? `Player Energy = ${characterInfo[0].current_energy}/${characterInfo[0].max_energy}` : "Player Energy"}
            </h2>
            <h2>
               {characterInfo[1] ? `Enemy Energy = ${characterInfo[1].current_energy}/${characterInfo[1].max_energy}` : "Enemy Energy"}
            </h2>
        </div>
    );
}


export default EnergyIndicator;