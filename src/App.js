import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './data/initial-data';
import {useState} from "react";
import Column from './components/Column';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

function App() {
  const [data, setData] = useState(initialData);

  const onDragStart = () => {
    document.body.style.color = "orange";
    document.body.style.transition = "background-color 0.2s ease";
  };

  const onDragUpdate = update => {
    const {destination} = update;
    const opacity = destination ?
                    destination.index / Object.keys(data.tasks).length :
                    0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  }

  const onDragEnd = result => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";

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
    <DragDropContext 
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Container>
        {data.columnOrder.map(columnId => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
          
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
}

export default App;
