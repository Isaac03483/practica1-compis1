/*
  NOMBRE: letra seguida de cualquier letro y/o número separados o no por guiones bajos
		[a-zA-Z][a-zA-Z0-9_]*

		Este campo describe a table_name y a property_name
		(la diferencia va a ser en la posición en la que se encuentre en la sintaxis)

	Palabras reservadas: INT, DECIMAL, STRING, BOOLEAN, true|TRUE, false|FALSE
	ENTERO: 0 | [1-9][0-9]*
	DECIMAL: {ENTERO}\.[0-9]+
	COMA = ","
	PUNTO_COMA = ";"
	COMILLA_DOBLE: \"
	COMILLA_SIMPLE: \'
	INICIO_COMENTARIO: #
	OPERADORES_A: (, ), /, *, +, -
	OPERADORES_R: <, <=, >=, ==, !=
	ASIGNACION: =
	NEGACION: !
	AND: &&
	OR: \|\|
*/

%lex

lineTerminator      \r|\n|\r\n
whitespace          {lineTerminator}|[ \t\f]
NAME                [a-zA-Z][a-zA-Z0-9_]*
INT                 "INT"
DECIMAL             "DECIMAL"
STRING              "STRING"
BOOLEAN             "BOOLEAN"
TRUE                "true"|"TRUE"
FALSE               "false"|"FALSE"
INTEGER             [0] | [1-9][0-9]*
DOUBLE              {INTEGER}\.[0-9]+
COMMA               ","
SEMICOLON           ";"
COMMENT             [#].*
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

%%

{whitespace}
{COMMENT}
{INT}               return "INT";
{DECIMAL}           return "DECIMAL";
{STRING}            return "STRING";
{BOOLEAN}           return "BOOLEAN";
{TRUE}              return "TRUE";
{FALSE}             return "FALSE";
{INTEGER}           return "INTEGER";
{DOUBLE}            return "DOUBLE";
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
{NAME}              return "NAME";
<<EOF>>             return "EOF";
.					          {console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}

/lex

%start main

%%

main
  : statements EOF                                                             {return $1;}
  ;







