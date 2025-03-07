list
  = line|.., delimiter| delimiter?

delimiter
  = _ "\n" _

line
  =  word? comment?

comment
  = ";" text:[^\r\n]* { return { type: "comment", text: text.join("") }; }


opcode
  = op:("DAT" 
      / "MOV" 
      / "ADD" 
      / "SUB" 
      / "MUL" 
      / "DIV" 
      / "MOD" 
      / "JMP" 
      / "JMZ" 
      / "JMN" 
      / "DJN" 
      / "CMP" 
      / "SLT" 
      / "SPL" 
      / "ORG" 
      / "DJZ")
      
instruction
 =  op:opcode mod:("." modifier)? (a_mode:mmode? a_num:number ("," b_mode:mmode? b_num:number)?)? comm:comment? 

number
  = sign:[+-]? digits:[0-9]+

modifier
  = mod:("A" / "B" / "AB" / "BA" / "F" / "X" / "I")

mmode
  = mode:("#" / "$" / "@" / "<" / ">")

word
  = text:$[a-z]i+ { return { type: "word", text }; }

_
  = [ \t]*