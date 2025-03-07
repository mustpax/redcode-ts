list
  = line|.., delimiter| delimiter?

delimiter
  = "\n"

line
  =  instruction? comment?

WS 
  = [ \t]+

comment
  = ";" text:[^\r\n]* { return { type: "comment", text: text.join("") }; }


opcode
  = opcode:("DAT" 
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
      / "DJZ") { return { type: 'opcode', opcode }; }
      
instruction
 =  opcode ("." modifier)? (WS operand _ ("," _ operand)?)?
 
// instruction
//  =  op:opcode WS mod:("." modifier)? (a_mode:mmode? a_num:number ("," b_mode:mmode? b_num:number)?)? 

operand
  = sign:[+-]? digits:[0-9]+

modifier
  = mod:("A" / "B" / "AB" / "BA" / "F" / "X" / "I")

mmode
  = mode:("#" / "$" / "@" / "<" / ">")

_
  = [ \t]*