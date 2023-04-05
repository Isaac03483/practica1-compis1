export class Message{
  static message: Message| null;
  messages: string[] = [];

  private constructor() {
  }

  public static getInstance(){
    if(this.message == null){
      this.message = new Message();
    }

    return this.message;
  }

  public clear(){
    this.messages = [];
  }

  public addMessage(message: string){
    this.messages.push(message);
  }

  public addMessages(messages: string[]){
    this.messages.unshift(...messages);
  }
}
