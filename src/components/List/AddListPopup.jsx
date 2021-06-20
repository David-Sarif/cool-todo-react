import React, {useState} from 'react'
import Badge from '../Badge/Badge'
import closeSvg from '../../assets/img/close.svg'


const AddListPopup = ({ colors, setPopupVisible }) => {
    const [selectedColor, selectColor] = useState(colors[0].id);
    
    return (
        <div className='addList__popup'>
            <img src={closeSvg} alt='closeSvg' onClick={() => setPopupVisible(false)} className="addList__popup-close-btn"></img>
            <input type="text" placeholder='Название папки' className='field' />
            <div className="addList__popup-colors">
                {colors.map(el =>
                    (<Badge className={selectedColor===el.id && 'active'} onClick={() => selectColor(el.id)} key={el.id} color={el.name}> </Badge>))}
            </div>

            <button className='button'>Добавить</button>
        </div>
    )
}

export default AddListPopup