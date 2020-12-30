import { Task } from "../../task";

const subTasks = new Map();

export const purchaseNewEgg = new Task(subTasks, subTasks.values().next().value) 
