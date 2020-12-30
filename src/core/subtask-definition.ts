import { Browser } from "puppeteer";

export class SubTask {
  execute:Ninja.ExecuteFunction;
  Name: string;
  Next: string | undefined;
  Prev: string | undefined;

  constructor(
    execute:Ninja.ExecuteFunction,
    name: string,
    next?: string,
    prev?: string
  ) {
    this.execute = execute;
    this.Name = name;
    this.Next = next;
    this.Prev = prev;
  }
}



export const createBlueprint = (name: string, execute:Ninja.ExecuteFunction): Ninja.SubTaskBluePrint => {
  return {
    name,
    execute
  }
  
}

export const SubTaskFactory= (BluePrints: Ninja.SubTaskBluePrint[]): Map<string, SubTask> => {

  const subTaskArray = SubTaskArrayFactory(BluePrints);
  const subTaskMap: Map<string, SubTask>  = new Map();
  subTaskArray.forEach( subTask => {
    subTaskMap.set(subTask.Name, subTask);
  })

  return subTaskMap
}



const SubTaskArrayFactory = (BluePrints: Ninja.SubTaskBluePrint[]): SubTask[] => {
  let SubTasks: SubTask[] = [];

  if (BluePrints.length === 0) {
    return [];
  }
  if (BluePrints.length === 1) {
    SubTasks.push(new SubTask(BluePrints[0].execute, BluePrints[0].name));
    return SubTasks;
  }

  if (BluePrints.length === 2) {
    SubTasks.push(
      new SubTask(BluePrints[0].execute, BluePrints[0].name, BluePrints[1].name)
    );
    SubTasks.push(
      new SubTask(
        BluePrints[1].execute,
        BluePrints[1].name,
        undefined,
        BluePrints[0].name
      )
    );
    return SubTasks;
  }

  let index = 1;

  SubTasks.push(
    new SubTask(BluePrints[0].execute, BluePrints[0].name, BluePrints[1].name)
  );
  while (index < BluePrints.length - 1) {
    SubTasks.push(
      new SubTask(
        BluePrints[index].execute,
        BluePrints[index].name,
        BluePrints[index + 1].name,
        BluePrints[index - 1].name
      )
    );
    index = index + 1
  }
  SubTasks.push(
    new SubTask(
      BluePrints[index].execute,
      BluePrints[index].name,
      undefined,
      BluePrints[index].name
    )
  );

  return SubTasks;
};
