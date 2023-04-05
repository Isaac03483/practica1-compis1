%{
  let lexicalErrors = [];
  function pushErrors(message){
    lexicalErrors.push(message);
  }
%}

%lex

lineTerminator      \r|\n|\r\n
whitespace          {lineTerminator}|[ \t\f]
INT                 "INT"
DECIMAL             "DECIMAL"
STRING              "STRING"
BOOLEAN             "BOOLEAN"
TRUE                "true"|"TRUE"
FALSE               "false"|"FALSE"
INTEGER             [0]|[1-9][0-9]*
DOUBLE              [0-9]+"."[0-9]+
COMMA               ","
SEMICOLON           ";"
COMMENT             \#[^\r\n]*
LPAREN              "("
RPAREN              ")"
PLUS                "+"
MINUS               "-"
TIMES               "*"
DIVIDE              "/"
EQUALS              "=="
LESS_THAN           "<"
GREATER_THAN        ">"
LESS_EQUALS         "<="
GREATER_EQUALS      ">="
NOT_EQUALS          "!="
ASSIGN              "="
NOT                 "!"
AND                 "&&"
OR                  "||"
STRING_VALUE        (\"[^\"]*\") | (\'[^\']*\')
NAME                ([a-zA-Z])[a-zA-Z0-9_]*


%%

{whitespace}        {}
{COMMENT}           {}
{INT}               return "INT";
{DECIMAL}           return "DECIMAL";
{STRING}            return "STRING";
{BOOLEAN}           return "BOOLEAN";
{TRUE}              return "TRUE";
{FALSE}             return "FALSE";
{DOUBLE}            return "DOUBLE";
{INTEGER}           return "INTEGER";
{COMMA}             return "COMMA";
{SEMICOLON}         return "SEMICOLON";
{LPAREN}            return "LPAREN";
{RPAREN}            return "RPAREN";
{PLUS}              return "PLUS";
{MINUS}             return "MINUS";
{TIMES}             return "TIMES";
{DIVIDE}            return "DIVIDE";
{EQUALS}            return "EQUALS";
{LESS_THAN}         return "LESS_THAN";
{GREATER_THAN}      return "GREATER_THAN";
{LESS_EQUALS}       return "LESS_EQUALS";
{GREATER_EQUALS}    return "GREATER_EQUALS";
{NOT_EQUALS}        return "NOT_EQUALS";
{ASSIGN}            return "ASSIGN";
{NOT}               return "NOT";
{AND}               return "AND";
{OR}                return "OR";
{STRING_VALUE}      {yytext = yytext.substr(1,yyleng-2);return "STRING_VALUE";}
{NAME}              {return "NAME";}
<<EOF>>             %{
                        console.log('fin de archivo');
                        return "EOF";
                    %}
.                   %{
                      pushErrors("Error: LEXICO Linea: "+yylloc.first_line+" Columna: "+yylloc.first_column+ " el valor: "+yytext+" no forma parte del lenguaje");
                      return "INVALID";
                    %}
/lex

%start main

%%

main
  : statements EOF
  {yy.message.addMessages(lexicalErrors);lexicalErrors = [];}
  | EOF
  {yy.message.addMessages(lexicalErrors);lexicalErrors = [];}

  ;

statements
  : statements statement
  | statement
  | error
  %{
    const message = "Error: SINTÁCTICO linea: "+this._$.first_line+" columna: "+this._$.first_column+" Se esperaba algo más";
    yy.message.addMessage(message);
  %}
  ;

statement
  : tableStatement SEMICOLON
  %{
    try{
      yy.dataBase.addTable($1);
      const message = "Tabla creada con éxito.";
      yy.message.addMessage(message);
    }catch(error){
      const message = "Error: SEMÁNTICO linea: "+this._$.first_line+" columna: "+this._$.first_column+" "+error;
      yy.message.addMessage(message);
    }
  %}
  | rowStatement SEMICOLON
  %{
      let tables = yy.dataBase.getTables();
      if(tables.length == 0){
        const message = "Error: SEMÁNTICO linea: "+this._$.first_line+" columna: "+this._$.first_column
                 +" No se ha creado una base de datos anteriormente.";
        yy.message.addMessage(message);
      } else {
        let table = tables[tables.length-1];
        try{
          table.addRow(new yy.Row($1));
          const message = "Registro creado con éxito.";
          yy.message.addMessage(message);

        }catch(error){
          const message = "Error: SEMÁNTICO linea: "+this._$.first_line+" columna: "+this._$.first_column+" "+error;
          yy.message.addMessage(message);
        }
      }
  %}
  ;


tableStatement
  : NAME LPAREN properties RPAREN                                             {$$ = new yy.Table(String($1), $3);}
  ;

properties
  : properties COMMA property                                                 {$$ = $1; $$.push($3);}
  | property                                                                  {$$ = []; $$.push($1);}
  ;

property
  : NAME type                                                                 {$$ = new yy.Property(String($1), $2);}
  ;

type
  : INT                                                                       {$$ = yy.PropertyType.INT;}
  | DECIMAL                                                                   {$$ = yy.PropertyType.DECIMAL;}
  | STRING                                                                    {$$ = yy.PropertyType.STRING;}
  | BOOLEAN                                                                   {$$ = yy.PropertyType.BOOLEAN;}
  ;

rowStatement
  : rowStatement COMMA attribute                                      {$$ = $1; $$.push($3);}
  | attribute                                                         {$$ = []; $$.push($1);}
  ;

attribute
  : NAME ASSIGN number
  %{
    if($3 % 1 == 0){
      $$ = new yy.Attribute(new yy.Property($1, yy.PropertyType.INT), $3);
    } else {
      $$ = new yy.Attribute(new yy.Property($1, yy.PropertyType.DECIMAL), $3);
    }
  %}
  | NAME ASSIGN STRING_VALUE                                          {$$ = new yy.Attribute(new yy.Property($1, yy.PropertyType.STRING), $3);}
  | NAME ASSIGN booleanResult                                         {$$ = new yy.Attribute(new yy.Property($1, yy.PropertyType.BOOLEAN), $3);}
  ;

booleanResult
  : booleanResult OR e                                                {$$ = Boolean($1) || Boolean($3);}
  | e                                                                 {$$ = $1;}
  ;

e
  : e AND f                                                          {$$ = Boolean($1) && Boolean($3);}
  | f                                                                {$$ = Boolean($1);}
  ;

f
  : n g
  %{
    //console.log("El tamaño de número de negaciones es de: "+$1.length);
    if($1 % 2 != 0) {
      $$ = !$2;
    } else {
      $$ = $2;
    }
  %}
  | g                                                                 {$$ = $1;}
  ;

n
  : n NOT                                                             {$$ = $1+1;}
  | NOT                                                               {$$ = 1;}
  ;

g
  : number EQUALS number                                              {$$ = $1 == $3;}
  | number NOT_EQUALS number                                          {$$ = $1 != $3;}
  | number LESS_THAN number                                           {$$ = $1 < $3;}
  | number LESS_EQUALS number                                         {$$ = $1 <= $3;}
  | number GREATER_THAN number                                        {$$ = $1 > $3;}
  | number GREATER_EQUALS number                                      {$$ = $1 >= $3;}
  | h                                                                 {$$ = $1;}
  ;

h
  : TRUE                                                              {$$ = true;}
  | FALSE                                                             {$$ = false;}
  | LPAREN booleanResult RPAREN                                       {$$ = $2;}
  ;

number
  : number PLUS b                                                     {$$ = $1 + $3;}
  | number MINUS b                                                    {$$ = $1 - $3;}
  | b                                                                 {$$ = $1;}
  ;

b
  : b TIMES c                                                         {$$ = $1 * $3;}
  | b DIVIDE c
  %{
    if($3 == 0){
      console.log("Imposible dividir un número entre cero");
      $$ = 1;
    } else {
      $$ = $1 / $3;
    }
  %}
  }
  | c                                                                 {$$ = $1;}
  ;

c
  : MINUS d                                                           {$$ = -1 * $2;}
  | d                                                                 {$$ = $1;}
  ;

d
  : INTEGER                                                           {$$ = Number($1);}
  | DOUBLE                                                            {$$ = Number($1);}
  | LPAREN a RPAREN                                                   {$$ = $2;}
  ;











