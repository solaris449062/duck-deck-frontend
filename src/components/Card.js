import React, { useState, useEffect } from 'react';

function Card({id, name, cost, damage, shield, heal, upgrade, handleCardClick}) {
    
    // const [cardStatus, setCardStatus] = useState(false) 
    // const [maxHP, setMaxHP] = useState(0) 
    // const [currentHP, setCurrentHP] = useState(0) 

    // useEffect(() => {
    // fetch("http://localhost:9292/characters")
    //     .then((r) => r.json())
    //     .then(gameCharArray => setCharacterInfo(gameCharArray[0]));
    // }, []);

    return (
        <div className="card" onClick={() => handleCardClick(id)}>
            
            <h2> 
                {id ? `id = ${id}` : null}
            </h2>

            <h2> 
                {name ? name : null}
            </h2>

            <h2> 
                {cost ? `cost = ${cost}` : null}
            </h2>

            <h2> 
                {damage ? `damage = ${damage}` : null}
            </h2>

            <h2> 
                {shield ? `shield = ${shield}` : null}
            </h2>

            <h2> 
                {heal ? `heal = ${heal}` : null}
            </h2>
        </div>
    );
}


export default Card;