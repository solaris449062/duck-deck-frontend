import React, { useState, useEffect } from 'react';

function EndTurn({handleEndTurn}) {

    return (
        <div className="end_turn" onClick={() => handleEndTurn()}>
            <h2>End Turn</h2>
        </div>
    )

}



export default EndTurn