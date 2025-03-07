list
  = line|.., delimiter| delimiter?

delimiter
  = _ "\n" _

line
  =  word / ""

word
  = $[a-z]i+

_
  = [ \t]*