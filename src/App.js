import React, { useState, useEffect } from "react";
import listSvg from './assets/img/list.svg'
import { List, AddList, Tasks } from './components/index'
import axios from "axios";
import { Route, useHistory, useLocation } from "react-router";

function App() {


  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let history = useHistory();
  let location = useLocation()

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => { setLists(data) });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, [])

  useEffect(() => {
    const listId = history.location.pathname.split('/lists/')[1];
    if (lists) {
      const list = lists.find(el => el.id === Number(listId))
      setActiveItem(list);
    }

  }, [lists, history.location.pathname])

  const onAddList = (obj) => {
    const newLists = [...lists, obj];
    setLists(newLists)
  }

  const onAddTask = (listId, taskObj) => {

    const newList = lists.map((el) => {
      if (el.id === listId) {
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
        }]}
          onClickItem={item => { history.push('/') }} />
        <List items={lists} isRemovable={true} removeList={removeList}
          onClickItem={item => {
            history.push(`/lists/${item.id}`)
          }}
          activeItem={activeItem} /></>)
        :
        ("Загрузка")}

      <AddList onAddList={onAddList} colors={colors} />


    </div>
    <div className="todo__tasks">
      <Route exact path='/'>
        {lists && lists.map(list => (
          <Tasks key={list.id} list={list} onAddTask={onAddTask} onEditTitle={onEditListTitle} withoutEmpty />
        ))
        }
      </Route>
      <Route path='/lists/:id'>
        {lists && activeItem &&
          <Tasks list={activeItem} onAddTask={onAddTask} onEditTitle={onEditListTitle} />
        }
      </Route>
    </div>
  </div>
  );
}

export default App;
