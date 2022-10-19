import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./Task";

const Container = styled.div`
    margin: 0.5rem;
    border: 1px solid lightgrey;
    border-radius: 0.125rem;
`;

const Title = styled.h3`
    padding: 0.5rem;
`;

const TaskList = styled.div`
    padding: 0.5rem;
    transition: background-color 0.2s ease;
    background-color: ${props => props.isDraggingOver ? "skyblue" : "white"};
`;

function Column({column, tasks}) {
    return (
        <Container>
            <Title>{column.title}</Title>
            <Droppable droppableId={column.id}>
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