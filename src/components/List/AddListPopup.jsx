import React, {useState} from 'react'
import Badge from '../Badge/Badge'
import closeSvg from '../../assets/img/close.svg'


const AddListPopup = ({ colors, setPopupVisible, onAddList }) => {
    const [selectedColor, selectColor] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState('');

    const onClose = () => {
        setPopupVisible(false);
        setInputValue('')
        selectColor(colors[0].id)
    }

    const addList = () => {
        if (!inputValue){
            alert('Введите название списка');
            return;
        }
        const color = colors.find(c=>(c.id===selectedColor)).name;
        onAddList({id:Math.random(), name: inputValue, colorId: selectedColor, color});
        onClose()
        
    }
    
    return (
        <div className='addList__popup'>
            <img src={closeSvg} alt='closeSvg' onClick={onClose} className="addList__popup-close-btn"></img>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Название папки' className='field' />
            <div className="addList__popup-colors">
                {colors.map(el =>
                    (<Badge className={selectedColor===el.id && 'active'} onClick={() => selectColor(el.id)} key={el.id} color={el.name}> </Badge>))}
            </div>

            <button className='button' onClick={addList}>Добавить</button>
        </div>
    )
}

export default AddListPopup