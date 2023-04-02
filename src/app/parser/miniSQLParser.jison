/*
Palabras reservadas: INT, DECIMAL, BOOLEAN, TEXT, TRUE, FALSE, DECLARE, AS, SET, AND, INPUT, PRINT,
			IF, ELSEIF, ELSE, END, THEN, NOT, AND, OR, SELECT, FROM, WHERE, LIMIT, OFFSET

	NOMBRE_VAR: "@" [a-zA-Z][a-zA-Z_]*

	OPERADOR_R: <,<=,>,>=,=,<>

	OPERADORES_A: (, ), /, *, +, -

	COMILLA_DOBLE: \"

	COMILLA_SIMPLE: \'

	COMA: ","

	PUNTO_COMA: ";"

	INICIO_COMENTARIO: "--"
*/

%lex

lineTerminator      \r|\n|\r\n
whitespace          {lineTerminator}|[ \t\f]
DECLARE             "DECLARE"
INT                 "INT"
DECIMAL             "DECIMAL"
BOOLEAN             "BOOLEAN"
TEXT                "TEXT"
INTEGER             [0-9]+
DOUBLE              [0-9]+"."[0-9]+
TRUE                "TRUE"
FALSE               "FALSE"
AS                  "AS"
SET                 "SET"
AND                 "AND"
INPUT               "INPUT"
PRINT               "PRINT"
IF                  "IF"
ELSEIF              "ELSEIF"
ELSE                "ELSE"
END                 "END"
THEN                "THEN"
NOT                 "NOT"
AND                 "AND"
OR                  "OR"
SELECT              "SELECT"
FROM                "FROM"
WHERE               "WHERE"
LIMIT               "LIMIT"
OFFSET              "OFFSET"
ID                  [@][a-zA-Z][a-zA-Z0-9_]*
COMMENT             ("--")[^\r\n]*
COMMA               ","
SEMICOLON           ";"
LPAREN              "("
RPAREN              ")"
PLUS                "+"
MINUS               "-"
TIMES               "*"
DIVIDE              "/"
EQUALS              "="
LESS_THAN           "<"
GREATER_THAN        ">"
LESS_EQUALS         "<="
GREATER_EQUALS      ">="
NOT_EQUALS          "<>"
TEXT_VALUE          (\"[^\"]*\") | (\'[^\']*\')
NAME                ([a-zA-Z])[a-zA-Z0-9_]*

%%

{whitespace}        {}
{COMMENT}           {}
{DECLARE}           {return "DECLARE";}
{INT}               {return "INT";}
{DECIMAL}           return "DECIMAL";
{TEXT}              return "TEXT";
{BOOLEAN}           return "BOOLEAN";
{TRUE}              return "TRUE";
{FALSE}             return "FALSE";
{DOUBLE}            {return "DOUBLE";}
{INTEGER}           {return "INTEGER";}
{COMMA}             return "COMMA";
{SEMICOLON}         return "SEMICOLON";
{AS}                return "AS";
{SET}               return "SET";
{AND}               return "AND";
{INPUT}             return "INPUT";
{PRINT}             return "PRINT";
{IF}                return "IF";
{ELSEIF}            return "ELSEIF";
{ELSE}              return "ELSE";
{END}               return "END";
{THEN}              return "THEN";
{SELECT}            return "SELECT";
{FROM}              return "FROM";
{WHERE}             return "WHERE";
{LIMIT}             return "LIMIT";
{OFFSET}            return "OFFSET";
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
{NOT}               return "NOT";
{AND}               return "AND";
{OR}                return "OR";
{ID}                return "ID";
{TEXT_VALUE}        {yytext = yytext.substr(1,yyleng-2);return "TEXT_VALUE";}
{NAME}              {return "NAME";}
<<EOF>>             return "EOF";
.					          {console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}

/lex

%start main

%%

main
  : assignments statements EOF
  | statements EOF
  | EOF
  ;

assignments
  : assignments assignment
  | assignment
  ;

statements
  : statements statement
  | statement
  ;

assignment
  : DECLARE ids AS type SEMICOLON
  | DECLARE ids AS type EQUALS value SEMICOLON
  ;

ids
  : ids COMMA ID
  | ID
  ;

type
  : INT
  | DECIMAL
  | TEXT
  | BOOLEAN
  ;

statement
  : setStatement SEMICOLON
  | ifStatement SEMICOLON
  | printStatement SEMICOLON
  | selectStatement SEMICOLON
  ;

setStatement
  : SET idsAssignment
  ;

idsAssignment
  : idsAssignment COMMA idAssignment
  | idAssignment
  ;

idAssignment
  : ID EQUALS value
  | ID EQUALS INPUT LPAREN TEXT_VALUE RPAREN
  ;

ifStatement
  : IF booleanValue THEN statements END IF
  | IF booleanValue THEN statements ELSE statements END IF
  | IF booleanValue THEN statements elseIfStatements END IF
  | IF booleanValue THEN statements elseIfStatements ELSE statements END IF
  ;

elseIfStatements
  : elseIfStatements ELSEIF booleanValue THEN statements
  | ELSEIF booleanValue THEN statements
  ;

printStatement
  : PRINT LPAREN content RPAREN
  ;

content
  : content COMMA value
  | value
  ;

value
  : number
  | booleanValue
  | TEXT_VALUE
  ;

booleanValue
  : booleanValue OR e
  | e
  ;

e
  : e AND f
  | f
  ;

f
  : NOT g
  | g
  ;

g
  : number EQUALS number
  | number NOT_EQUALS number
  | number LESS_THAN number
  | number LESS_EQUALS number
  | number GREATER_THAN number
  | number GREATER_EQUALS number
  | h
  ;

h
  : TRUE
  | FALSE
  | LPAREN booleanValue RPAREN
  ;

selectStatement
  : SELECT properties FROM NAME
  ;

properties
  : TIMES
  | propertyNames
  ;

propertyNames
  : propertyNames COMMA NAME
  | NAME
  ;

number
  : number PLUS b
  | number MINUS b
  | b
  ;

b
  : b TIMES c
  | b DIVIDE c
  | c
  ;

c
  : MINUS d
  | d
  ;

d
  : INTEGER                                                         {console.log("Encontre un Entero "+$1);}
  | DOUBLE                                                          {console.log("Encontre un decimal "+$1);}
  | ID
  | LPAREN a RPAREN
  ;
