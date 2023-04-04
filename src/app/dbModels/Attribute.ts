import {Property} from "./Property";

export class Attribute{
  property: Property;
  value: any;


  constructor(property: Property, value: any) {
    this.property = property;
    this.value = value;
  }


}
