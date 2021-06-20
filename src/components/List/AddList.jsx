import React, { useState } from 'react'
import List from './List'
import addSvg from '../../assets/img/add.svg'

import AddListPopup from './AddListPopup'
import './AddList.scss'

const AddList = ({ colors }) => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    return (
        <div className='addList'>
            <List items={[{
                className: 'list__add-button',
                icon: addSvg,
                name: 'Добавить папку',
            },]}
                onClickAddButton={() => { setPopupVisible(!isPopupVisible) }} >
            </List >
            {isPopupVisible ? <AddListPopup setPopupVisible={setPopupVisible} colors = {colors}></AddListPopup> : ''}
        </div>
    )
}

export default AddList