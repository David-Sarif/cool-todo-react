import React from 'react';
import axios from 'axios';
import './List.scss';
import classNames from "classnames";
import Badge from '../Badge/Badge';
import removeSvg from '../../assets/img/remove.svg';




const List = ({ items, onClickAddButton, isRemovable, removeList }) => {

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

                    <li key={i} className={classNames(el.className, { 'active': el.active })}>
                        <i>
                            {el.icon ? <img src={el.icon} alt="list icon" /> : <Badge color={el.color.name}></Badge>}
                        </i>
                        <span>{el.name}</span>
                        {isRemovable && <img onClick={() => onRemove(el)} className='list__remove-icon' src={removeSvg} alt={'remove icon'} />}
                    </li>
                ))
            }


        </ul>
    )
}

export default List