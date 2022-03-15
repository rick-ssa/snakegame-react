import './styles.css'

const Food = ({
    position,
    size, 
    backgroundColor,
    visible,
    isRounded
})=> {
    
    return (
        <div 
            className="food"
            style={{
                backgroundColor,
                left: position.left,
                top: position.top,
                width: `${size}px`,
                height: `${size}px`,
                opacity: visible ? 1 : 0,
                borderRadius: isRounded ? '50%' : 'none'
            }}
        />
    )
}

export default Food