import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 0.125rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: ${props => props.isDragging ? "lightgreen" : "white"};
    display: flex;
    gap: 0.5rem;
`;

const Handle = styled.div`
    width: 1.25rem;
    height: 1.25rem;
    background-color: orange;
    border-radius: 0.25rem;
`;

function Task({task, index}) {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <Handle {...provided.dragHandleProps} />
                    {task.content}
                </Container>
            )}
        </Draggable>
    );
}

export default Task;