export enum TASK_TYPE {
  PARALLEL = 'PARALLEL',
  SERIES = 'SERIES',
}

export interface IWrappedTasks {
  type: TASK_TYPE;
  tasks: (() => void)[];
}
