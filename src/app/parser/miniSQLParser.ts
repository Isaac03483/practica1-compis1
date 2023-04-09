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
import {MiniError} from "../miniModels/MiniError";
import {Select} from "../miniModels/Select";

declare var miniSQLParser: any;
export class MiniSQLParser{

  private source: string;
  data: any;


  constructor(source: string) {
    this.source = source;
    MiniError.getInstance().clear();
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
    miniSQLParser.yy.Select = Select;
    miniSQLParser.yy.Print = Print;
    miniSQLParser.yy.Assignment = Assignment;
    miniSQLParser.yy.MiniError = MiniError.getInstance();

  }

  parse(): SymbolTable|undefined{
    try{
      const instructions = miniSQLParser.parse(this.source);
      this.data = instructions;
      let symbolTable = new SymbolTable();

      if(MiniError.getInstance().errors.length > 0){
        return undefined;
      }

      instructions.forEach((it: Instruction)=>{
        if(MiniError.getInstance().errors.length == 0){
          try{
            it.execute(symbolTable);
          }catch (error){
            MiniError.getInstance().addError(String(error));
          }
        }
      });
      return symbolTable;
    } catch (error){
      console.log(error);
      console.log("Algo salió mal a la hora de parsear en miniSQLParser");
    }

    return undefined;
  }
}
