// Redcode grammar based on redcode.g4

// Main entry point
file
  = l1:line lines:(EOL line)* EOL? { return { l1, lines } } 

line
  = (comment / instr / '')

comment
  = ";" text:[^\r\n]* { return { type: "comment", text: text.join("") }; }

instr
 = op:opcode { return op }

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
      / "DJZ") { return op; }

EOL
  = "\r\n" / "\n"

// Skip whitespace
_ "whitespace"
  = [ \t]*
