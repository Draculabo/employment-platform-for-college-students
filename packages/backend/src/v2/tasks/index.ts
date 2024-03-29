import { initService } from './initService';

export const initTasks = async (): Promise<void> => {
  const tasks = [initService];

  for (const task of tasks) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await task();
  }
};
