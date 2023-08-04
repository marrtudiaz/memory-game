import './App.css'
import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard'


const cardsImages = [
  { "src": "/img/cool.png", matched:false },
  { "src": "/img/dollar.png", matched:false },
  { "src": "/img/bug.png", matched:false },
  { "src": "/img/love.png" , matched:false},
  { "src": "/img/ghost.png" , matched:false},
  { "src": "/img/house.png", matched:false },
]


function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);


  //shuffle cards
  const shuffledCards = () => {
    const shuffledCards = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
    console.log(shuffledCards)
  }

  
  //handle a choice of cards
  const handleChoice =(card)=>{
   choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2  selected cards to see if they match 

  useEffect(()=>{
if(choiceOne&&choiceTwo){
if(choiceOne.src===choiceTwo.src){
  setCards(prevCards=>{
    return prevCards.map(card=>{
      if(card.src===choiceOne.src){
        return {...card,matched:true}
      }else {
        return card;
      }
    })
  })
  resetTurn()
}
else {
  
  setTimeout(()=>resetTurn(),1000);
}
}
  },[choiceOne, choiceTwo])

  //when dependency changess, its choiceone and two


//reset choices and increase turn

const resetTurn=()=>{
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns=>prevTurns+1);
}
  return (
    <div className="App">
      <h1>Emoji Match Using React</h1>
      <button onClick={shuffledCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card===choiceOne|| card===choiceTwo||card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App