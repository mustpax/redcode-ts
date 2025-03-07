list
  = line|.., delimiter| delimiter?

delimiter
  = _ "\n" _

line
  =  word? comment?

comment
  = ";" text:[^\r\n]* { return { type: "comment", text: text.join("") }; }

word
  = text:$[a-z]i+ { return { type: "word", text }; }

_
  = [ \t]*