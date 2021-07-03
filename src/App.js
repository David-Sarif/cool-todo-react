import React, { useState } from "react";
import listSvg from './assets/img/list.svg'
import List from './components/List/List'
import AddList from "./components/List/AddList";
import Tasks from './components/Tasks/Tasks'

import DB from './assets/db.json'


function App() {
  const [lists, setLists] = useState(DB.lists.map(list => {
    list.color = DB.colors.find(color => (color.id === list.colorId)).name;
    return list
  }))

  const onAddList = (obj) => {
    console.log(obj)
    const newLists = [...lists, obj];
    setLists(newLists)
  }

  const removeList = (item) => {
    console.log(item)
  }

  return (<div className="todo">
    <div className="todo__sidebar">
      <List items={[{
        icon: listSvg,
        name: 'Все задачи',
        active: true,
      }]}/>

     
      <List items={lists} isRemovable={true} removeList={removeList} />
      <AddList onAddList={onAddList} colors={DB.colors}/>


    </div>
    <div className="todo__tasks">
      <Tasks/>

    </div>
  </div>
  );
}

export default App;
