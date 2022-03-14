import './styles.css'

const Snake = ({positions, sizePiece}) => {
  return (
    <>
        <div 
            className="snake_head"
            style={{
                left:`${positions[0].left}px`,
                top: `${positions[0].top}px`,
                width: `${sizePiece}px`,
                height:`${sizePiece}px`,
            }}
        />

        {positions.filter((p,index)=>index!==0).map((position,index)=>{
            return(
                <div 
                    className="snake_body"
                    key={index}
                    style={{
                        left:`${position.left}px`,
                        top: `${position.top}px`,
                        width: `${sizePiece}px`,
                        height:`${sizePiece}px`,
                    }}
                />
            )
        })}

    </>
  )
}

export default Snake