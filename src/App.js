import { useEffect, useRef, useState } from 'react';
import './App.css';
import Snake from './components/snake/Snake';

function App() {
  const [sizeAndPace, setSizeAndPace] = useState(10)

  const [positions, setPositions] = useState([
    {left:100, top: 100},
    {left:90,top:100},
    {left:90,top:90},
    {left:90,top:80},
    {left:90,top:70},
    {left:80,top:70},
    {left:70,top:70},
    {left:60,top:70},
  ])

  useEffect(()=>{
    tempMoveRef.current = setTimeout(move,50)
    document.onkeydown = handleArrowKeys
    return ()=>{
      clearTimeout(tempMoveRef.current)
      document.onkeydown = null
    }
  },[positions])

  const directions = {
    ArrowRight: {left:sizeAndPace, top:0, opposite: 'ArrowLeft'}, 
    ArrowLeft:{left:-sizeAndPace, top:0, opposite: 'ArrowRight'},
    ArrowUp:{left:0, top:-sizeAndPace, opposite: 'ArrowDown'},
    ArrowDown:{left:0, top:sizeAndPace, opposite: 'ArrowUp'},
  }

  const directionRef = useRef('ArrowRight')
  const tempMoveRef = useRef(null)

  const move = () => {
    if(tempMoveRef.current) {
      clearTimeout(tempMoveRef)
    }

    if(directions[directionRef.current]) {
      let newLeft = positions[0].left
      let newTop = positions[0].top

      const newPositions = positions.map((position,index)=>{
        if(index===0) {
          return {left: position.left + directions[directionRef.current].left, top: position.top + directions[directionRef.current].top}
        }

        let tempLeft = position.left
        let tempTop = position.top
        const newPosition = {left: newLeft, top: newTop}
        newLeft = tempLeft
        newTop = tempTop
        return newPosition
      })

      setPositions(newPositions)
    }

  }

  const handleArrowKeys = (e)=>{
    const typed = e.key || e.code

    if(!directions[typed]) return
    
    if(typed !== directionRef.current && 
      typed !== directions[directionRef.current].opposite) 
    {
      directionRef.current = typed
      move()
    }
  }
  
  return (
    <div className="App">
      <Snake 
        positions={positions}
        sizePiece={sizeAndPace}
      />
    </div>
  );
}

export default App;
