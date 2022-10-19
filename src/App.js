import './App.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './data/initial-data';
import {useState} from "react";
import Column from './components/Column';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

function App() {
  const [data, setData] = useState(initialData);
  const [homeIndex, setHomeIndex] = useState(null);

  const onDragStart = start => {
    document.body.style.color = "orange";
    document.body.style.transition = "background-color 0.2s ease";

    setHomeIndex(data.columnOrder.indexOf(start.source.droppableId));
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

    setHomeIndex(null);

    const {destination, source, draggableId, type} = result;

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

    if (type === "column") {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData({...data, columnOrder: newColumnOrder});

      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setData({...data, columns: {...data.columns, [newColumn.id]: newColumn}});

      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setData({...data, columns: {...data.columns, [newStart.id]: newStart, [newFinish.id]: newFinish}});
  };

  return (
    <DragDropContext 
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable
        droppableId="all-colums" 
        direction="horizontal" 
        type="column"
      >
        {provided => (
          <Container 
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

              // Disable drop to the left columns
              const isDropDisabled = index < homeIndex;
              
              return (
                <Column 
                  key={column.id} 
                  column={column} 
                  tasks={tasks} 
                  isDropDisabled={isDropDisabled}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
