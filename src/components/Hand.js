import React, { useState, useEffect } from 'react';
import Card from './Card'

function Hand() {
    const [hand, setHand] = useState(undefined) 
    // const [maxHP, setMaxHP] = useState(0) 
    // const [currentHP, setCurrentHP] = useState(0) 

    useEffect(() => {
        fetch("http://localhost:9292/cards")
            .then((r) => r.json())
            .then(cardsHandArray => setHand(cardsHandArray));
    }, []);

    function handleClick() {
        
    }

    return (
        <div className="hand">
            {hand ? hand.map(card =>                 
                <Card 
                    name={card.name}
                    cost={card.cost} 
                    damage={card.damage} 
                    shield={card.shield} 
                    heal={card.heal}
                    upgrade={card.upgrade}
                />
            ): null}
        </div>
    );
}


export default Hand;