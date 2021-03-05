import React, { useMemo } from 'react';
import { sortTasks, Task } from './Task';

interface TodoListProps {
  tasks: Task[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  const processedTasks = useMemo(() => sortTasks(tasks), [tasks]);

  return (
    <ul>
      {processedTasks.map((task) => (
        <li key={task.createTime}>{task.title}</li>
      ))}
    </ul>
  );
};

export default React.memo(TodoList);
