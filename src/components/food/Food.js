import './styles.css'
import { memo } from 'react'

const Food = ({
    position,
    size, 
    backgroundColor,
    visible,
    isRounded
})=> {

    const borderRadius = isRounded ? '50%' : '0'
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
                borderRadius
            }}
        />
    )
}

export default memo(Food)