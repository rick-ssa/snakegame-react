import { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import Food from './components/food/Food';
import Snake from './components/snake/Snake';

function App() {
  const [sizeAndPace, setSizeAndPace] = useState(10)
  const [food, setFood] = useState({
    position: {left: 150, top: 150},
    visiblility: false,
    color: 'yellow',
    isRounded: false
  })

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
    if(!food.visiblility) {
      timeFoodVisibleRef.current = setTimeout(makeFoodVisible,1000)
    }
  },[food])

  const foodHasBeenEaten = useCallback(
    ()=>{
      return positions[0].left === food.position.left && positions[0].top === food.position.top
    },
    [positions]
  )

  const directions = {
    ArrowRight: {left:sizeAndPace, top:0, opposite: 'ArrowLeft'}, 
    ArrowLeft:{left:-sizeAndPace, top:0, opposite: 'ArrowRight'},
    ArrowUp:{left:0, top:-sizeAndPace, opposite: 'ArrowDown'},
    ArrowDown:{left:0, top:sizeAndPace, opposite: 'ArrowUp'},
  }

  const directionRef = useRef('ArrowRight')
  const tempMoveRef = useRef(null)
  const timeFoodVisibleRef = useRef(null)
  const isRoudedRef = useRef(false)

  const makeFoodVisible = () => {
    const time = (Math.round(Math.random() * 3) + 5) * 1000
    setFood(prev=>({...prev,position: {...prev.position}, visiblility: true}))
    timeFoodVisibleRef.current = setTimeout(()=>{
      const newFood = {
        color: changeFoodColor(),
        position: changeFoodPosition(1200,600, sizeAndPace), 
        isRounded: !isRoudedRef.current,
        visiblility: false
      }

      isRoudedRef.current = !isRoudedRef.current
      
      setFood(newFood)
    },time)
  }

  const changeFoodPosition = (maxLeft, maxTop, step) => {
    const stepsLeft = Math.floor(maxLeft / step)
    const stepsTop = Math.floor(maxTop / step)
    const left = Math.round(Math.random() * stepsLeft) * step
    const top = Math.round(Math.random() * stepsTop) * step

    return {left, top}
  }

  const changeFoodColor = () => {

    const colors = ['yellow', 'red', 'green', 'blue', 'white']  
    return colors[Math.round(Math.random() * (colors.length - 1))]

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
        backgroundColor = {food.color}
        position={food.position}
        visible = {food.visiblility}
        isRounded = {food.isRounded}
      />

      <Snake 
        positions={positions}
        sizePiece={sizeAndPace}
      />
    </div>
  );
}

export default App;
