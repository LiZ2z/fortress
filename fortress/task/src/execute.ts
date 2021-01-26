import execParallel from './execParallel';
import execSerial from './execSerial';
import { IWrappedTasks, TASK_TYPE } from './types';

/**
 * **执行**
 */
export default function execute(wrappedTasks: IWrappedTasks) {
  if (!wrappedTasks) {
    return;
  }

  if (typeof wrappedTasks !== 'object' || Array.isArray(wrappedTasks)) {
    throw TypeError('Invalid task type.');
  }

  switch (wrappedTasks.type) {
    case TASK_TYPE.PARALLEL:
      return execParallel(wrappedTasks.tasks);
    case TASK_TYPE.SERIES:
      return execSerial(wrappedTasks.tasks);
    default: {
      throw Error('');
    }
  }
}
