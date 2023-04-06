import {Value, ValueType} from "../miniModels/Value";
import {If} from "../miniModels/If";
import {Input} from "../miniModels/Input";
import {Declare} from "../miniModels/Declare";
import {Else} from "../miniModels/Else";
import {UnaryOperation} from "../miniModels/UnaryOperation";
import {BinaryOperation} from "../miniModels/BinaryOperation";
import {Set} from "../miniModels/Set";
import {Print} from "../miniModels/Print";
import {VariableType} from "../miniModels/Variable";
import {Assignment} from "../miniModels/Assignment";
import {Instruction} from "../miniModels/Instruction";
import {OperationType} from "../miniModels/OperationType";
import {SymbolTable} from "../miniModels/SymbolTable";

declare var miniSQLParser: any;
export class MiniSQLParser{

  private source: string;


  constructor(source: string) {
    this.source = source;
    miniSQLParser.yy.Value = Value;
    miniSQLParser.yy.ValueType = ValueType;
    miniSQLParser.yy.VariableType = VariableType;
    miniSQLParser.yy.If = If;
    miniSQLParser.yy.Input = Input;
    miniSQLParser.yy.Declare = Declare;
    miniSQLParser.yy.Else = Else;
    miniSQLParser.yy.UnaryOperation = UnaryOperation;
    miniSQLParser.yy.BinaryOperation = BinaryOperation;
    miniSQLParser.yy.OperationType = OperationType;
    miniSQLParser.yy.Set = Set;
    miniSQLParser.yy.Print = Print;
    miniSQLParser.yy.Assignment = Assignment;

  }

  parse(){
    try{
      const instructions = miniSQLParser.parse(this.source);
      let symbolTable = new SymbolTable();
      instructions.forEach((it: Instruction)=>{
        it.execute(symbolTable);
      });

      console.log(symbolTable);
    } catch (error){
      console.log(error);
      console.log("Algo salió mal a la hora de parsear en miniSQLParser");
    }
  }
}
