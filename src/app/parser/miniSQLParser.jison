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
ELSE                "ELSE"
ELSEIF              "ELSEIF"
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
{NOT_EQUALS}        return "NOT_EQUALS";
{GREATER_EQUALS}    return "GREATER_EQUALS";
{LESS_EQUALS}       return "LESS_EQUALS";
{LESS_THAN}         return "LESS_THAN";
{GREATER_THAN}      return "GREATER_THAN";
{EQUALS}            return "EQUALS";
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
  {$$ = $1; $$.push(...$2); return $$;}

  ;

assignments
  : assignments assignment
  {$$ = $1; $$.push($2);}

  | assignment
  {$$ = []; $$.push($1);}

  ;

statements
  : statements statement
  {$$ = $1; $$.push($2);}
  |
  {$$ = [];}
  ;

assignment
  : DECLARE ids AS type SEMICOLON
  {$$ = new yy.Declare(this._$.first_line,this._$.first_line,$2, $4);}
  | DECLARE ids AS type EQUALS value SEMICOLON
  {$$ = new yy.Declare(this._$.first_line,this._$.first_line,$2, $4,$6);}

  ;

ids
  : ids COMMA ID
  {$$= $1; $$.push($3);}
  | ID
  {$$ = []; $$.push($1);}
  ;

type
  : INT
  {$$ = yy.VariableType.INT;}

  | DECIMAL
  {$$ = yy.VariableType.DECIMAL;}

  | TEXT
  {$$ = yy.VariableType.TEXT;}

  | BOOLEAN
  {$$ = yy.VariableType.BOOLEAN;}
  ;

statement
  : setStatement SEMICOLON
  {$$ = $1;}

  | ifStatement SEMICOLON
  {$$ = $1;}

  | printStatement SEMICOLON
  {$$ = $1;}

  | selectStatement SEMICOLON
  {$$ = $1;}

  ;

setStatement
  : SET idsAssignment
  {$$ = new yy.Set(this._$.first_line, this._$.first_column, $2);}


  ;

idsAssignment
  : idsAssignment COMMA idAssignment
  {$$ = $1; $$.push($3);}

  | idAssignment
  {$$ = []; $$.push($1);}
  ;

idAssignment
  : ID EQUALS value
  {$$ = new yy.Assignment(this._$.first_line, this._$.first_column, $1,$3);}

  | ID EQUALS inputProd
  {$$ = new yy.Assignment(this._$.first_line, this._$.first_column, $1,$3);}


  ;

inputProd
  :INPUT LPAREN TEXT_VALUE RPAREN
  {$$ = new yy.Input(this._$.first_line, this._$.first_column, new yy.Value(this._$.first_line, this._$.first_column, yy.ValueType.TEXT_VALUE, $3));}
  ;

ifStatement
  : IF value THEN statements END IF
  {$$ = new yy.If(this._$.first_line, this._$.first_column, $2,$4);}

  | IF value THEN statements elseIfStatements END IF
  {$$ = new yy.If(this._$.first_line, this._$.first_column, $2,$4,$5);}

  ;

elseIfStatements
  : ELSEIF value THEN statements elseIfStatements
  {$$ = new yy.If(this._$.first_line, this._$.first_column, $2,$4,$5);}

  | ELSEIF value THEN statements
  {$$ = new yy.If(this._$.first_line, this._$.first_column, $2,$4);}

  | ELSE statements
  {$$ = new yy.Else(this._$.first_line, this._$.first_column, $2);}

  ;

printprintStatement
  : PRINT LPAREN content RPAREN
  {$$ = new yy.Print(this._$.first_line, this._$.first_column, $3);}
  ;

content
  : content COMMA value
  {$$ = $1; $$.push($2);}

  | value
  {$$ = []; $$.push($1);}
  ;

value
  : value OR e
  {$$ = new yy.BinaryOperation(this._$.first_line, this._$.first_column, yy.OperationType.OR, $1,$3);}

  | e
  {$$ = $1;}

  ;

e
  : e AND f
  {$$ = new yy.BinaryOperation(this._$.first_line, this._$.first_column, yy.OperationType.AND, $1,$3);}

  | f
  {$$ = $1;}

  ;

f
  : NOT g
  {$$ = new yy.UnaryOperation(this._$.first_line, this._$.first_column, yy.OperationType.NOT, $2);}

  | g
  {$$ = $1;}

  ;

g
  : g EQUALS h
  {$$ = new yy.BinaryOperation(this._$.first_line, this._$.first_column, yy.OperationType.EQUALS, $1,$3);}

  | g NOT_EQUALS h
  {$$ = new yy.BinaryOperation(this._$.first_line, this._$.first_column, yy.OperationType.NOT_EQUALS, $1,$3);}

  | g LESS_THAN h
  {$$ = new yy.BinaryOperation(this._$.first_line, this._$.first_column, yy.OperationType.LESS_THAN, $1,$3);}

  | g GREATER_THAN h
  {$$ = new yy.BinaryOperation(this._$.first_line, this._$.first_column, yy.OperationType.GREATER_THAN, $1,$3);}

  | g LESS_EQUALS h
  {$$ = new yy.BinaryOperation(this._$.first_line, this._$.first_column, yy.OperationType.LESS_EQUALS, $1,$3);}

  | g GREATER_EQUALS h
  {$$ = new yy.BinaryOperation(this._$.first_line, this._$.first_column, yy.OperationType.GREATER_EQUALS, $1,$3);}

  | h
  {$$ = $1;}

  ;

h
  : number
  {$$ = $1;}

  | TEXT_VALUE
  {$$ = new yy.Value(this._$.first_line, this._$.first_column, yy.ValueType.TEXT_VALUE, $1);}

  | TRUE
  {$$ = new yy.Value(this._$.first_line, this._$.first_column, yy.ValueType.BOOLEAN, true);}

  | FALSE
  {$$ = new yy.Value(this._$.first_line, this._$.first_column, yy.ValueType.BOOLEAN, false);}

  ;


selectStatement
  : SELECT properties FROM NAME
  | SELECT properties FROM NAME whereProd
  | SELECT properties FROM NAME limitProd
  | SELECT properties FROM NAME offSetProd
  ;

whereProd
  : WHERE whereValue
  | WHERE whereValue limitProd
  | WHERE whereValue offSetProd
  ;

limitProd
  : LIMIT number
  | LIMIT number offSetProd
  ;

offSetProd
  : OFFSET number
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
  {$$ = new yy.BinaryOperation(this._$.first_line, this._$.first_column, yy.OperationType.PLUS, $1,$3);}

  | number MINUS b
  {$$ = new yy.BinaryOperation(this._$.first_line, this._$.first_column, yy.OperationType.MINUS, $1,$3);}

  | b
  {$$ = $1;}

  ;

b
  : b TIMES c
  {$$ = new yy.BinaryOperation(this._$.first_line, this._$.first_column, yy.OperationType.TIMES, $1,$3);}

  | b DIVIDE c
  {$$ = new yy.BinaryOperation(this._$.first_line, this._$.first_column, yy.OperationType.DIVIDE, $1,$3);}

  | c
  {$$ = $1;}
  ;

c
  : MINUS d
  {$$ = new yy.UnaryOperation(this._$.first_line, this._$.first_column, yy.OperationType.MINUS, $2);}

  | d
  {$$ = $1;}
  ;

d
  : INTEGER
  {$$ = new yy.Value(this._$.first_line, this._$.first_column, yy.ValueType.INTEGER, $1);}

  | DOUBLE
  {$$ = new yy.Value(this._$.first_line, this._$.first_column, yy.ValueType.DOUBLE, $1);}

  | ID
  {$$ = new yy.Value(this._$.first_line, this._$.first_column, yy.ValueType.ID, $1);}

  | LPAREN value RPAREN
  {$$ = $2;}
  ;

whereValue
  : whereValue OR i
  | i
  ;

i
  : i AND j
  | j
  ;

j
  : NOT k
  | k
  ;

l
  : l EQUALS m
  | l NOT_EQUALS m
  | l LESS_THAN m
  | l GREATER_THAN m
  | l LESS_EQUALS m
  | l GREATER_EQUALS m
  | m
  ;

m
  : number
  | TEXT_VALUE
  | TRUE
  | FALSE
  | NAME
  | LPAREN whereValue RPAREN
  ;
