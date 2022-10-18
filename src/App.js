import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './data/initial-data';
import {useState} from "react";
import Column from './components/Column';

function App() {
  const [data, setData] = useState(initialData);

  const onDragEnd = result => {
    const {destination, source, draggableId} = result;

    // If dropped outside droppable, destination will be null
    // Then, return
    if (!destination) {
      return;
    }

    // If dropped at the same place, return
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) {
          return;
    }

    const column = data.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    setData({...data, columns: {...data.columns, [newColumn.id]: newColumn}});
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
