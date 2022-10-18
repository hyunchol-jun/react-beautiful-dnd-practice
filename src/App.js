import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './data/initial-data';
import {useState} from "react";
import Column from './components/Column';

function App() {
  const [data, setData] = useState(initialData);

  const onDragEnd = result => {
    // TODO: reorder our column
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map(columnId => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
        
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}

export default App;
