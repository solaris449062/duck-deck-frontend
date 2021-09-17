import React, { useState, useEffect } from 'react';

function Restart({handleRestart}) {

    return (
        <div className="restart" onClick={() => handleRestart()}>
            <h2>Restart Game</h2>
        </div>
    )
}


export default Restart;