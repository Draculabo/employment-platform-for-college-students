export const initTasks = async (): Promise<void> => {
  const tasks = [] as any[];

  for (const task of tasks) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await task();
  }
};
