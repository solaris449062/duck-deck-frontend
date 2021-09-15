import React, { useState, useEffect } from 'react';

function HpBar() {
    const [characterInfo, setCharacterInfo] = useState(undefined) 
    const [maxHP, setMaxHP] = useState(0) 
    const [currentHP, setCurrentHP] = useState(0) 

    useEffect(() => {
    fetch("http://localhost:9292/characters")
        .then((r) => r.json())
        .then(gameCharArray => setCharacterInfo(gameCharArray[0]));
    }, []);

    return (
        <div>
            <h2>
                {characterInfo ? `HP = ${characterInfo.current_HP}/${characterInfo.max_HP}` : null}
            </h2>
        </div>
    );
}


export default HpBar;