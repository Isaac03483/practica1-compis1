import {PropertyType} from "./PropertyType";

export class Row{
  propertyName: String;
  propertyType: PropertyType;
  propertyValue: any;


  constructor(propertyName: String, propertyType: PropertyType, propertyValue: any) {
    this.propertyName = propertyName;
    this.propertyType = propertyType;
    this.propertyValue = propertyValue;
  }

}
