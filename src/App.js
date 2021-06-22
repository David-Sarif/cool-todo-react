import React, { useState } from "react";
import listSvg from './assets/img/list.svg'
import List from './components/List/List'
import AddList from "./components/List/AddList";

import DB from './assets/db.json'


function App() {
  const [lists, setLists] = useState(DB.lists.map(list => {
    list.color = DB.colors.find(color => (color.id === list.colorId)).name;
    return list
  }))

  const onAddList = (obj) => {
    console.log(obj)
    const  newLists = [...lists,obj];
    setLists(newLists)
  }

  return (<div className="todo">
    <div className="todo__sidebar">
      <List items={[{
        icon: listSvg,
        name: 'Все задачи',
        active: true,
      }]}>

      </List>
      <List items={lists} />
      <AddList onAddList={onAddList} colors={DB.colors}></AddList>


    </div>
    <div className="todo__tasks"></div>
  </div>
  );
}

export default App;
