import React, { useState } from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/add.svg'

const AddTaskForm = ({ list, onAddTask }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const toggleFormVisible = () => {
        setIsFormVisible(!isFormVisible);
        setInputValue('');
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false,
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/tasks/', obj).then(({ data }) => {
            onAddTask(list.id, data)
        }).catch(() => {
            alert('Что-то пошло не так')
        }).finally(() => {
            setIsLoading(false);
            toggleFormVisible()
        }
        )

    }
    return (
        <div className="tasks__form">

            {!isFormVisible ?
                <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={addSvg} alt="icon-add" />
                    <span>Новая задача</span>

                </div>
                :
                <div className="tasks__form-block">
                    <input onChange={(e) => { setInputValue(e.target.value) }} type="text" placeholder='Текст задачи' className='field field-add-task' value={inputValue} />
                    <div className="tasks__form-buttons">
                        <button disabled={isLoading} onClick={addTask} className='button button-add-task' >
                            {isLoading ? 'Загружаем' : 'Добавить задачу'}
                        </button>
                        <button onClick={toggleFormVisible} className='button button-decline' >
                            Отмена
                        </button>
                    </div>
                </div>}


        </div>
    );
}

export default AddTaskForm;
