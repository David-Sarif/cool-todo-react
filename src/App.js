import React, { useState, useEffect } from "react";
import listSvg from './assets/img/list.svg'
import { List, AddList, Tasks } from './components/index'
import axios from "axios";

// import DB from './assets/db.json'


function App() {
    

  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {setLists(data)});
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []) 

  const onAddList = (obj) => {
    const newLists = [...lists, obj];
    setLists(newLists)
  }

  const removeList = (id) => {
    const newLists = lists.filter(el => (el.id!==id))
    setLists(newLists)
  }

  return (<div className="todo">
    <div className="todo__sidebar">

      {lists ? (<><List items={[{
        icon: listSvg,
        name: 'Все задачи',
        active: true,
      }]}/>

     
      <List items={lists} isRemovable={true} removeList={removeList} /></>)
      :
      ("Загрузка")}

      <AddList onAddList={onAddList} colors={colors}/>


    </div>
    <div className="todo__tasks">
      { lists && <Tasks list={lists[1]}/>}

    </div>
  </div>
  );
}

export default App;
