import React, { useState } from 'react';
import './Tasks.scss';
import AddTaskForm from './AddTaskForm';
import editSvg from '../../assets/img/edit.svg'
import removeSvg from '../../assets/img/remove.svg'



const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty }) => {
    let [taskField, setTaskField] = useState('')
    const editTitle = () => {
        const newTitle = window.prompt('Переназовите название списка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle)
        }

    }
    const onEditTask = (id) => {
        console.log('clicked, ', id)
    }

    return (
        <div className="tasks">
            <h2 style={{color:list.color.hex}} className="tasks__title">
                {list.name}
                <img onClick={() => editTitle()} className='tasks__edit-icon' src={editSvg} alt="iconEdit" />
            </h2>

            <div className="tasks__items">

                {!list.tasks && !withoutEmpty && <h2 className="tasks__empty">Задачи отсутствуют</h2>}
                { list.tasks && list.tasks.map((task, id) => (
                    <div className="tasks__items-row" key={id}>
                        <div className="checkbox">

                            <input id={`task-${id}`} type="checkbox" name="" />
                            <label htmlFor={`task-${id}`}>
                                <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </label>

                        </div>

                        <input value={task.text} onChange={()=>{}}/>
                        <div className="tasks__items-row-actions">
                            <div onClick={()=>onEditTask(id)}>
                                <img src={editSvg} alt="edit_icon" />
                            </div>
                            <div>
                                <img src={removeSvg} alt="remove_icon" />
                            </div>
                        </div>
                    </div>))}


            </div>
           <AddTaskForm list={list} onAddTask={onAddTask}/>
        </div>)
}

export default Tasks