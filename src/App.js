import React from "react";
import listSvg from './assets/img/list.svg'
import List from './components/List'

function App() {
  return (<div className="todo">
    <div className="todo__sidebar">
      <List items={[
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

    </div>
    <div className="todo__tasks"></div>
  </div>
  );
}

export default App;
