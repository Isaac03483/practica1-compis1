import {PropertyType} from "./PropertyType";

export class Property{
  propertyName: String;
  propertyType: PropertyType;


  constructor(propertyName: String, propertyType: PropertyType) {
    this.propertyName = propertyName;
    this.propertyType = propertyType;
  }
}
