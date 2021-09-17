import React, { useState, useEffect } from 'react';
import Card from './Card'

function Deck({handleCardClick, deckCards}) {

    return (
        <div className="deck">
            {deckCards ? deckCards.map(card =>                 
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

export default Deck;