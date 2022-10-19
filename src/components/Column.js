import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./Task";

const Container = styled.div`
    margin: 0.5rem;
    border: 1px solid lightgrey;
    border-radius: 0.125rem;
    width: 15rem;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h3`
    padding: 0.5rem;
`;

const TaskList = styled.div`
    padding: 0.5rem;
    transition: background-color 0.2s ease;
    background-color: ${props => props.isDraggingOver ? "skyblue" : "white"};
    flex-grow: 1;
    min-height: 5rem;
`;

function Column({column, tasks, isDropDisabled}) {
    return (
        <Container>
            <Title>{column.title}</Title>
            <Droppable 
                droppableId={column.id}
                isDropDisabled={isDropDisabled}
                // items can only be dropped into the same type it started in.
                // type={column.id === "column-3" ? "done" : "active"}
            >
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    );
}

export default Column;