import { TASK_TYPE } from './types';

/**
 * 将传入的任务注册为并行任务
 */
export function parallel(...tasks) {
  return {
    type: TASK_TYPE.PARALLEL,
    tasks,
  };
}

/**
 * 将传入的任务注册为串行任务
 */
export function series(...tasks) {
  return {
    type: TASK_TYPE.SERIES,
    tasks,
  };
}
