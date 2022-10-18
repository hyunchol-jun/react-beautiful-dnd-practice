import './App.css';
import initialData from './data/initial-data';
import {useState} from "react";
import Column from './components/Column';

function App() {
  const [data, setData] = useState(initialData);

  return (
    <>
      {data.columnOrder.map(columnId => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
        
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </>
  );
}

export default App;
