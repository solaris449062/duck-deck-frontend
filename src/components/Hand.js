import React, { useState, useEffect } from 'react';
import Card from './Card'

function Hand({handleCardClick, handCards}) {

    return (
        <div className="hand">
            {handCards ? handCards.map(card =>                 
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