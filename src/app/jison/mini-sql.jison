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
INT                 "INT"
DECIMAL             "DECIMAL"
BOOLEAN             "BOOLEAN"
TEXT                "TEXT"
INTEGER             [0] | [1-9][0-9]*
DOUBLE              {INTEGER}\.[0-9]+
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
COMMENT             ("--").*
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

%%

{whitespace}
{COMMENT}
{INT}               return "INT";
{DECIMAL}           return "DECIMAL";
{TEXT}              return "TEXT";
{BOOLEAN}           return "BOOLEAN";
{TRUE}              return "TRUE";
{FALSE}             return "FALSE";
{INTEGER}           return "INTEGER";
{DOUBLE}            return "DOUBLE";
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
{TEXT_VALUE}      {yytext = yytext.substr(1,yyleng-2);return "STRING_VALUE";}
<<EOF>>             return "EOF";
.					          {console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}

/lex

%start main



%%
