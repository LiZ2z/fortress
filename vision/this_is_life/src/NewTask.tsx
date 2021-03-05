import React from 'react';
import { Task } from './Task';

interface NewTaskProps {
  onAdd: (task: Task) => void;
}

const NewTask: React.FC<NewTaskProps> = ({ onAdd }) => {
  return (
    <div>
      <button type="button">+</button>
    </div>
  );
};

export default React.memo(NewTask);
