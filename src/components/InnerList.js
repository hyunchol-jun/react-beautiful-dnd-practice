import {memo} from "react"
import Task from "./Task";

const InnerList = memo(function InnerList({tasks}) {
    return (
        <>
            {tasks.map((task, index) => {
                return <Task key={task.id} task={task} index={index} />
            })}
        </>
    );
});

export default InnerList;