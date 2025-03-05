// Redcode grammar based on redcode.g4

// Main entry point
file
  = lines:line+ { return lines; }

line
  = (instr:instruction / comm:comment) EOL { return instr || comm; }

instruction
  = op:opcode mod:("." modifier)? (a_mode:mmode? a_num:number ("," b_mode:mmode? b_num:number)?)? comm:comment? {
      return {
        type: "instruction",
        opcode: op,
        modifier: mod ? mod[1] : null,
        a: a_num ? {
          mode: a_mode || "$", // Default addressing mode is direct ($)
          value: a_num
        } : null,
        b: b_num ? {
          mode: b_mode || "$", // Default addressing mode is direct ($)
          value: b_num
        } : null,
        comment: comm
      };
    }

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

modifier
  = mod:("A" / "B" / "AB" / "BA" / "F" / "X" / "I") { return mod; }

mmode
  = mode:("#" / "$" / "@" / "<" / ">") { return mode; }

number
  = sign:[+-]? digits:[0-9]+ { 
      const value = parseInt(digits.join(""), 10);
      return sign === "-" ? -value : value; 
    }

comment
  = ";" text:[^\r\n]* { return { type: "comment", text: text.join("") }; }

EOL
  = "\r\n" / "\n"

// Skip whitespace
_ "whitespace"
  = [ \t]*
