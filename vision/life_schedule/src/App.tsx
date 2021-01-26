import React, { useEffect, useRef, useState } from 'react';
import NewTask from './NewTask';
import { Task } from './Task';
import TodoList from './TodoList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const onAdd = (t: Task) => {};

  return (
    <div>
      <h1>This is my life</h1>
      <NewTask onAdd={onAdd} />
      <TodoList tasks={tasks} />
    </div>
  );
};

export default React.memo(App);
