import React from "react";
import listSvg from './assets/img/list.svg'
import List from './components/List/List'
import AddList from "./components/List/AddList";

import DB from './assets/db.json'


function App() {
  return (<div className="todo">
    <div className="todo__sidebar">
      
      <List  items={[
        {
          icon: listSvg,
          name: 'Все задачи',
          active: true,
        },
        {
          color: 'green',
          name: 'Покупки',
        },
        {
          color: 'blue',
          name: 'Фронтенд',
        },
        {
          color: 'pink',
          name: 'Сериальчики',
        },
        
      ]} />
      <AddList colors={DB.colors}></AddList>


    </div>
    <div className="todo__tasks"></div>
  </div>
  );
}

export default App;
