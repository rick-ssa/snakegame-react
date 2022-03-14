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
  ])



  useEffect(()=>{
    tempMoveRef.current = setTimeout(move,50)
    document.onkeyup = handleArrowKeys
    return ()=>{
      clearTimeout(tempMoveRef.current)
      document.onkeyup = null
    }
  },[positions])

  const directions = {
    ArrowRight: {left:sizeAndPace, top:0}, 
    ArrowLeft:{left:-sizeAndPace, top:0},
    ArrowUp:{left:0, top:-sizeAndPace},
    ArrowDown:{left:0, top:sizeAndPace},
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
          return {left: position.left + directions[directionRef.current].left, top: position.top + + directions[directionRef.current].top}
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
    if((e.key || e.code) !== directionRef.current) {
      directionRef.current = e.code || e.key
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
