export class MiniError{
  static miniError: MiniError|null;
  errors: string[] = [];

  private constructor() {

  }

  public static getInstance(){
    if(this.miniError == null){
      this.miniError = new MiniError();
    }

    return this.miniError;
  }

  public clear(){
    this.errors = [];
  }

  public addError(error: string){
    this.errors.push(error);
  }

  public addLexicalError(errors: string[]){
    this.errors.unshift(...errors);
  }


}
