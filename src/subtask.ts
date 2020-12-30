import "./ninja.d.ts";

const definition = async (
  routine: Ninja.AsyncFunction,
  FallBacks: Ninja.FallBack[]
) => {
  const result = await routine();

  const error = FallBacks.find(FallBack => FallBack.errorQueury(result) == true)

  return error ?? false
};

class subTask {
  routine: Ninja.AsyncFunction;
  FallBacks: Ninja.FallBack[];
  definition = definition;
  
  constructor(routine: Ninja.AsyncFunction, FallBacks: Ninja.FallBack[]) {
    this.routine = routine;
    this.FallBacks = FallBacks;
  }
}
