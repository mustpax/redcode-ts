program
  = @line|.., delimiter| delimiter?

delimiter
  = "\n"

line
  =  instruction:instruction? _ comment:comment? {
    return { instruction, comment };
  }

WS "whitespace"
  = [ \t]+

_ "optional_whitespace"
  = [ \t]*

comment "comment"
  = ";" text:[^\r\n]* { return text.join(""); }

opcode "opcode"
  = op:(  "DAT"i / "MOV"i / "ADD"i / "SUB"i / "MUL"i 
        / "DIV"i / "MOD"i / "JMP"i / "JMZ"i / "JMN"i
        / "DJN"i / "CMP"i / "SLT"i / "SPL"i / "ORG"i
        / "DJZ"i) ![$a-zA-Z0-9_] { return op.toUpperCase(); }

instruction "instruction"
 = opcode:opcode 
   modifier:("." @modifier)? 
   args:args? 
   { return { opcode, modifier, args }; }

args
 = WS arg1:operand _ arg2:("," _ @operand)? { return [arg1, arg2] }
 
operand "operand"
  = mmode:mmode? 
    sign:[-+]? 
    digits:[0-9]+ ![$a-zA-Z_] // Prevent ambiguous continuations
  { return {
      mmode,
      value: parseInt((sign ?? '') + digits.join(''))
    }; }

modifier "modifier"
  = mod:("AB"i / "BA"i / [ABFXI]i) { return mod.toUpperCase(); }

mmode "addressing_mode"
  = mode:[#$*@{}<>]