import {Variable} from "./Variable";

export class SymbolTable extends Array<Variable>{


  constructor(parent?: SymbolTable) {
    super();
    if(parent){
      this.push(...parent);
    }
  }

  add(variable: Variable) {
    return this.push(variable);
  }

  getById(id: string) {
    return this.find(v => v.id == id);
  }

  contains(id: string) {
    return this.some(v => v.id == id);
  }
}
