import React from 'react';
import './List.scss';
import classNames from "classnames";
import Badge from '../Badge/Badge';



const List = ({ items, onClickAddButton }) => {

    return (
        <ul className="list" onClick={onClickAddButton}>
            {
                items.map((el, i) => (
                    <li key={i} className={classNames(el.className, {'active' :el.active})}>
                        <i>
                           {el.icon ? <img src={el.icon} alt="list icon" /> : <Badge color={el.color}></Badge>}
                        </i>
                        <span>{el.name}</span>
                    </li>
                ))
            }


        </ul>
    )
}

export default List