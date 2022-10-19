import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 0.125rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: ${props => props.isDragging ? "lightgreen" : "white"};
`;

function Task({task, index}) {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    {task.content}
                </Container>
            )}
        </Draggable>
    );
}

export default Task;