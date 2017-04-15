searchExpression = "(" _ term:searchExpression _ ")"
    { return term; }
  / term0:term _ "OR" _ term1:term
    { return {op : "OR", terms : [term0, term1] }; }
  / term0:term _ "AND"? _ term1:term
    { return {op : "AND", terms : [term0, term1] }; }
  / term:term { return term; }

term = 
  "len(" num:[0-9]+ ")" 
    { return { op : "len", value : parseInt(num.join(''), 10) }; }
  / unary:unary _ term:searchExpression {
    return {op : unary, terms : [term]};
  }
  / id:id { return id; }

unary = ">=" / "<=" / "=" / "<" / ">" / "!"

// len
// quote escaping working correctly?

id = "true" { return true; }
  / "false" { return false; }
  / "\"" string:([^"] / ("\\\""))+ "\"" { return string.join(''); }
  / [0-9a-zA-Z]+ { return text(); }

_ "whitespace"
  = [ \t\n\r]*
