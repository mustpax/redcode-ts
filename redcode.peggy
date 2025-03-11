program
  = @line|.., delimiter| delimiter?

delimiter
  = "\n"

line
  =  instruction:instruction? _ comment:comment? {
    return { instruction, comment };
  }

WS 
  = [ \t]+

comment
  = ";" text:[^\r\n]* { return text.join(""); }


opcode
  = @("DAT"i 
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
      / "DJZ"i)
      
instruction
 =  opcode:opcode modifier:("." @modifier)? args:args? { return { opcode, modifier, args} }

args
 = WS arg1:operand _ arg2:("," _ @operand)? { return [arg1, arg2] }
 
// instruction
//  =  op:opcode WS mod:("." modifier)? (a_mode:mmode? a_num:number ("," b_mode:mmode? b_num:number)?)? 

operand
  = mmode:mmode? sign:[+-]? digits:[0-9]+ 
  { return {
      mmode,
      value: parseInt((sign ?? '') + digits)
    }
  }

modifier
  = mod:("A"i / "B"i / "AB"i / "BA"i / "F"i / "X"i / "I"i)

mmode
  = mode:("#" / "$" / "*" / "@" / "{" / "}" / "<" / ">")

_
  = [ \t]*