export enum Priority {
  never = -Infinity,
  normal = 1,
  now = Infinity,
}

export interface Task {
  priority: Priority;

  title: string;

  description?: string;

  createTime: number;

  startTime?: number;

  deadline?: number;

  endTime?: number;
}

export function newTask({
  title,
  description,
  startTime,
  endTime,
  deadline,
}: Task): Task {
  return {
    priority: Priority.normal,
    title,
    description,
    createTime: new Date().getTime(),
    startTime,
    deadline,
    endTime,
  };
}

const compareStartTime = (a: Task, b: Task, timestamp: number): 9 | -9 => {
  if (a.startTime && b.startTime) {
    if (a.startTime < b.startTime) {
      return 9;
    }
    return -9;
  }

  if (a.startTime && !b.startTime) {
    // 已经开始
    if (a.startTime < timestamp) {
      return 9;
    }
    return -9;
  }

  return -9;
};

export function sortTasks(tasks: Task[]) {
  const currentTime = new Date().getTime();

  // 默认 a优先级小于b
  return [...tasks].sort((a, b) => {
    // a 优先于 b, 1
    if (a.startTime && b.startTime && a.startTime < b.startTime) {
      return 1;
    }

    return -1;
  });
}
