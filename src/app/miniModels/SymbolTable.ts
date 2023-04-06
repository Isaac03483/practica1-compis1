import {Variable} from "./Variable";

export class SymbolTable extends Array<Variable>{


  constructor(parent?: SymbolTable) {
    super();

    if(parent){
      this.push(...parent)
    }
  }

  addVariable(variable: Variable){
    this.push(variable);
  }

  findById(id: string){
    return this.find(i => i.id == id);
  }

  idInTable(id: string){
    return this.some(i => i.id == id);
  }

}
