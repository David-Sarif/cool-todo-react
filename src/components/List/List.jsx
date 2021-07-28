import React from 'react';
import axios from 'axios';
import './List.scss';
import classNames from "classnames";
import Badge from '../Badge/Badge';
import removeSvg from '../../assets/img/remove.svg';




const List = ({ items, onClickAddButton, isRemovable, removeList, onClickItem, activeItem }) => {

    const onRemove = (item) => {
        if (window.confirm('Вы уверены, что хотите удалить?')) {
            axios.delete('http://localhost:3001/lists/' + item.id)
            removeList(item.id)
        }
    };
    return (
        <ul className="list" onClick={onClickAddButton}>
            {

                items.map((el, i) => (

                    <li key={i} onClick={onClickItem ? () => onClickItem(el) : null}
                        className={classNames(el.className, 
                        { active: el.active ? el.active: activeItem && activeItem.id === el.id })}>
                        <i>
                            {el.icon ? <img src={el.icon} alt="list icon" /> : <Badge color={el.color.name}></Badge>}
                        </i>
                        <span>{el.name}{el.tasks && el.tasks.length > 0 && ` (${el.tasks.length})`}</span>
                        {isRemovable && <img onClick={() => onRemove(el)} className='list__remove-icon' src={removeSvg} alt={'remove icon'} />}
                    </li>
                ))
            }


        </ul>
    )
}

export default List