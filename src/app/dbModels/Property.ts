export enum PropertyType {
  INT, DECIMAL, STRING, BOOLEAN
}

export class Property{
  propertyType: PropertyType;
  propertyName: string;

  constructor(propertyName: string, propertyType: PropertyType) {
    this.propertyType = propertyType;
    this.propertyName = propertyName;
  }

}
