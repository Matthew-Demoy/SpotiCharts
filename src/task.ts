import { Browser } from "puppeteer";
import { SubTask } from "./core/subtask-definition";
import { NextTask, Status, WalmartTasks } from "./fixtures/enums";

const determineNextTask = (
  currentTask: SubTask,
  nextTask: string,
  subTasks: Map<string, SubTask>
): SubTask | undefined => {
  if (nextTask === NextTask.NEXT) {
    const next = subTasks.get(currentTask.Next ?? "");

    return next;
  }
  if (nextTask === NextTask.PREVIOUS) {
    const prev = subTasks.get(currentTask.Prev ?? "");

    return prev;
  }
  if (nextTask === NextTask.FIRST) {
    return subTasks.values().next().value;
  }
  if (nextTask === NextTask.LAST) {
    const last = Array.from(subTasks.values()).pop();

    return currentTask;
  }

  if (nextTask === NextTask.SAME) {
    return currentTask;
  }

  const selected = subTasks.get(nextTask);

  return selected;
};

export class Task {
  SubTasks: Map<string, SubTask>;
  CurrentTask: SubTask;
  Status: Status = Status.INITIAL;
  isTerminated: boolean = false;

  Execute = async (options: Ninja.TaskOptions, browser: Browser) => {
    this.Status = Status.STARTED;
    while (this.isTerminated !== true) {
      const result = await this.RunTask(options, browser);
      this.Status = result.status;
      this.CurrentTask =
        determineNextTask(this.CurrentTask, result.nextTask, this.SubTasks) ??
        this.CurrentTask;

      this.isTerminated = result.terminate;
    }
  };

  RunTask = async (
    options: Ninja.TaskOptions,
    browser: Browser
  ): Promise<Ninja.TaskResult> => {
    const result = await this.CurrentTask.execute(options, browser);
    return result;
  };

  constructor(SubTasks: Map<string, SubTask>, CurrTask: SubTask) {
    this.SubTasks = SubTasks;
    this.CurrentTask = CurrTask ?? SubTasks.values().next().value;
  }
}
