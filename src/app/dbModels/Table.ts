import {Property} from "./Property";
import {Row} from "./Row";
import {Attribute} from "./Attribute";

export class Table{
  name: string;
  properties: Property[];
  rows: Row[] = [];


  constructor(name: string, properties: Property[]) {
    this.name = name;
    this.properties = properties;
  }

  addRow(row: Row){
    if(row.row.length != this.properties.length){
      throw new Error("La cantidad de atributos no coincide con el número de propiedades de la tabla");
    }

    for(let i = 0; i < row.row.length-1; i++){
      for(let j = i+1; j < row.row.length; j++){
        if(row.row[i].property.propertyName == row.row[j].property.propertyName){
          throw new Error("Se ha definido la misma propiedad más de una vez "+row.row[i].property.propertyName+" con "+row.row[j].property.propertyName);
        }
      }
    }

    row.row.forEach((r: Attribute) =>{
      const property = this.properties.find(p => p.propertyName == r.property.propertyName);
      if(!property){
        throw new Error("No se ha encontrado la propiedad "+r.property.propertyName+" en la tabla.");
      }

      if(property.propertyType != r.property.propertyType){
        throw new Error("Las propiedades no coinciden con los tipos.");
      }

    });

    this.rows.push(row);

  }

}
