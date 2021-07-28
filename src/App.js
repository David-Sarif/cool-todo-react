import React, { useState, useEffect } from "react";
import listSvg from './assets/img/list.svg'
import { List, AddList, Tasks } from './components/index'
import axios from "axios";

function App() {


  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => { setLists(data) });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, [])

  const onAddList = (obj) => {
    const newLists = [...lists, obj];
    setLists(newLists)
  }

  const onAddTask = (listId, taskObj) => {

    const newList = lists.map((el) => {
      if (el.id === listId){
        el.tasks = [...el.tasks, taskObj]
      }
      return el
    })
    setLists(newList)
  }

  const removeList = (id) => {
    const newLists = lists.filter(el => (el.id !== id))
    setLists(newLists)
  }

  const onEditListTitle = (id, title) => {
    const newLists = lists.map(list => {
      if (list.id === id) {
        list.name = title
      }
      return list
    });
    axios.patch('http://localhost:3001/lists/' + id, {
      name: title
    }).catch(() => alert('Что-то пошло не так'))
    setLists(newLists)
  }

  return (<div className="todo">
    <div className="todo__sidebar">

      {lists ? (<>
        <List items={[{
          icon: listSvg,
          name: 'Все задачи',
          active: true,
        }]} />
        <List items={lists} isRemovable={true} removeList={removeList}
          onClickItem={item => {
            setActiveItem(item);
          }}
          activeItem={activeItem} /></>)
        :
        ("Загрузка")}

      <AddList onAddList={onAddList} colors={colors} />


    </div>
    <div className="todo__tasks">
      {lists && activeItem && <Tasks list={activeItem} onAddTask={onAddTask} onEditTitle={onEditListTitle} />}

    </div>
  </div>
  );
}

export default App;
