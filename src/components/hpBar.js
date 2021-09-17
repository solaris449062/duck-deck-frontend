import React, { useState, useEffect } from 'react';

function HpBar({characterInfo}) {
    // console.log(characterInfo)

    // return a hp bar, partially filled up to a point indicated by current HP
    return (
        <div>
            <h2> 
                {characterInfo[0] ? `Player HP = ${characterInfo[0].current_HP}/${characterInfo[0].max_HP}` : "Player HP"}
            </h2>
            <h2>
               {characterInfo[1] ? `Enemy HP = ${characterInfo[1].current_HP}/${characterInfo[1].max_HP}` : "Enemy HP"}
            </h2>
            <h2> 
                {characterInfo[0] ? `Player Shield = ${characterInfo[0].shield}` : "Player Shield"}
            </h2>
            <h2>
               {characterInfo[1] ? `Enemy Shield = ${characterInfo[1].shield}` : "Enemy Shield"}
            </h2>
        </div>
    );
}


export default HpBar;