
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
                        console.log('Error lexico '+yytext);
                        return "INVALID";
                    %}
/lex

%start main

%%

main
  : statements EOF                                                             {return $1;}
  | EOF
  ;

statements
  : statements statement                                                      {$$ = $1; $$.push($2);}
  | statement                                                                 {$$ = []; $$.push($1);}

  ;

statement
  : tableStatement SEMICOLON                                                  {$$ = new yy.Statement(yy.StatementType.TABLE, $1);}
  | rowStatement SEMICOLON                                                    {$$ = new yy.Statement(yy.StatementType.ROW, $1);}
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











