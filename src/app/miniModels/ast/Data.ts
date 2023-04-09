export class Data{
  id: string;
  children: Data[] = [];


  constructor(id: string, children?: Data[]) {
    this.id = id;
    if(children){
      this.children = children;
    }
  }
}
