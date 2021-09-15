import React from 'react'
const enemyHp = 
let enemyIMG = ./images/bandit.jpg

function EnemyPortrait(props) {
   return (
      <h2>props.name</h2>
      <img src = {enemyIMG} alt ='ENEMY'/>
         //<h3>props.class</h3>
         //<h3>props.hpbar</h3>
   );
}

export default EnemyPortrait