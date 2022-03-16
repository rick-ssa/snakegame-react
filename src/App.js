import { useEffect, useRef, useState } from 'react';
import './App.css';
import Food from './components/food/Food';
import Snake from './components/snake/Snake';

function App() {
  const [sizeAndPace, setSizeAndPace] = useState(10)
  const [foodVsibility, setFoodVisibility] = useState(false)
  const [foodPosition, setFoodPosition] = useState({left: 150, top: 150})
  const [foodColor, setFoodColor] = useState('yellow')
  const [isRounded, setIsRounded] = useState(false)

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

  useEffect(()=> {
    if(!foodVsibility) {
      timeFoodVisibleRef.current = setTimeout(makeFoodVisible,1000)
    }
  },[foodVsibility])

  const directions = {
    ArrowRight: {left:sizeAndPace, top:0, opposite: 'ArrowLeft'}, 
    ArrowLeft:{left:-sizeAndPace, top:0, opposite: 'ArrowRight'},
    ArrowUp:{left:0, top:-sizeAndPace, opposite: 'ArrowDown'},
    ArrowDown:{left:0, top:sizeAndPace, opposite: 'ArrowUp'},
  }

  const directionRef = useRef('ArrowRight')
  const tempMoveRef = useRef(null)
  const timeFoodVisibleRef = useRef(null)
  const colors = ['yellow', 'red', 'green', 'blue', 'white']

  const makeFoodVisible = () => {
    const time = (Math.round(Math.random() * 10) + 20) * 1000
    setFoodVisibility(true)
    timeFoodVisibleRef.current = setTimeout(()=>{
      setIsRounded(prev=>!prev)
      changeFoodColor(colors)
      changeFoodPosition(1200,600)
      setFoodVisibility(false)
    },time)
  }

  const changeFoodPosition = (maxLeft, maxTop) => {
    const left = Math.round(Math.random() * maxLeft)
    const top = Math.round(Math.random() * maxTop)

    setFoodPosition({left, top})
  }

  const changeFoodColor = (colors) => {
    const color = colors[Math.round(Math.random() * (colors.length - 1))]
    setFoodColor(color)
  }

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
      <Food 
        size = {sizeAndPace}
        backgroundColor = {foodColor}
        position={foodPosition}
        visible = {foodVsibility}
        isRounded = {isRounded}
      />

      <Snake 
        positions={positions}
        sizePiece={sizeAndPace}
      />
    </div>
  );
}

export default App;
