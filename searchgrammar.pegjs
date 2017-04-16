searchExpression =
  term0:term _ "OR" _ term1:term
    { return {op : "OR", terms : [term0, term1] }; }
  / term0:term _ "AND"? _ term1:term
    { return {op : "AND", terms : [term0, term1] }; }
  / term:term { return term; }

term = 
  "len(" num:[0-9]+ ")" 
    { return { op : "len", value : parseInt(num.join(''), 10) }; }
  / unary:unary _ term:term {
    return {op : unary, terms : [term]};
  }
  / id:expr { return id; }

unary = ">=" / "<=" / "=" / "<" / ">" / "!"

// quote escaping working correctly?

expr = 
  "(" _ term:searchExpression _ ")" { return term; }
  / id

id = "true" { return true; }
  / "false" { return false; }
  / '"' string:(('\\"') / [^"])+ '"' { return string.join(''); }
  / [0-9a-zA-Z]+ { return text(); }

_ "whitespace"
  = [ \t\n\r]*
