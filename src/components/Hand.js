import React, { useState, useEffect } from 'react';
import Card from './Card'

function Hand({handleCardClick}) {
    const [hand, setHand] = useState(undefined) 
    // const [maxHP, setMaxHP] = useState(0) 
    // const [currentHP, setCurrentHP] = useState(0) 

    useEffect(() => {
        fetch("http://localhost:9292/cards")
            .then((r) => r.json())
            .then(cardsHandArray => setHand(cardsHandArray));
    }, []);


    return (
        <div className="hand">
            {hand ? hand.map(card =>                 
                <Card 
                    key={card.id}
                    id={card.id}
                    name={card.name}
                    cost={card.cost} 
                    damage={card.damage} 
                    shield={card.shield} 
                    heal={card.heal}
                    upgrade={card.upgrade}
                    handleCardClick={handleCardClick}
                />
            ): null}
        </div>
    );
}


export default Hand;