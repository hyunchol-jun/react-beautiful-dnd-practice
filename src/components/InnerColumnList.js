import {memo} from "react";
import Column from "./Column";

const InnerColumnList = memo(function InnerColumnList({column, taskMap, index, isDropDisabled}) {
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return (
        <Column 
            column={column} 
            tasks={tasks} 
            index={index} 
            isDropDisabled={isDropDisabled} 
        />
    );
});

export default InnerColumnList;