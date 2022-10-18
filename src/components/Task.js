import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 0.125rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: white;
`;

function Task({task, index}) {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {task.content}
                </Container>
            )}
        </Draggable>
    );
}

export default Task;