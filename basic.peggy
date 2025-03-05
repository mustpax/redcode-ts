// Redcode grammar based on redcode.g4

// Main entry point
file
  = lines:line+ { return lines; }

line
  = comment

comment
  = ";" text:[^\r\n]* { return { type: "comment", text: text.join("") }; }

EOL
  = "\r\n" / "\n"

// Skip whitespace
_ "whitespace"
  = [ \t]*
