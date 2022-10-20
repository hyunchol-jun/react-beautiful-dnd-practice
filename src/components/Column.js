import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./Task";
import InnerList from "./InnerList";

const Container = styled.div`
    margin: 0.5rem;
    border: 1px solid lightgrey;
    border-radius: 0.125rem;
    width: 15rem;
    display: flex;
    flex-direction: column;
    background-color: white;
`;

const Title = styled.h3`
    padding: 0.5rem;
`;

const TaskList = styled.div`
    padding: 0.5rem;
    transition: background-color 0.2s ease;
    background-color: ${props => props.isDraggingOver ? "lightgrey" : "inherit"};
    flex-grow: 1;
    min-height: 5rem;
`;

function Column({column, tasks, isDropDisabled, index}) {
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps} 
                    ref={provided.innerRef}
                >
                    <Title {...provided.dragHandleProps}>{column.title}</Title>
                    <Droppable 
                        droppableId={column.id}
                        isDropDisabled={isDropDisabled}
                        type="task"
                        // items can only be dropped into the same type it started in.
                        // type={column.id === "column-3" ? "done" : "active"}
                    >
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <InnerList tasks={tasks} /> 
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    );
}

export default Column;