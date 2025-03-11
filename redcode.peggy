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
  = opcode:("DAT"i 
      / "MOV"i 
      / "ADD"i 
      / "SUB"i 
      / "MUL"i 
      / "DIV"i 
      / "MOD"i 
      / "JMP"i 
      / "JMZ"i 
      / "JMN"i 
      / "DJN"i 
      / "CMP"i 
      / "SLT"i 
      / "SPL"i 
      / "ORG"i 
      / "DJZ"i) { return { type: 'opcode', opcode }; }
      
instruction
 =  opcode ("." modifier)? (WS operand _ ("," _ operand)?)?
 
// instruction
//  =  op:opcode WS mod:("." modifier)? (a_mode:mmode? a_num:number ("," b_mode:mmode? b_num:number)?)? 

operand
  = mmode? [+-]? [0-9]+ 
  { }

modifier
  = @mod:("A"i / "B"i / "AB"i / "BA"i / "F"i / "X"i / "I"i)

mmode
  = mode:("#" / "$" / "*" / "@" / "{" / "}" / "<" / ">")

_
  = [ \t]*