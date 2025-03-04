import { createToken, CstParser, Lexer } from "chevrotain";

export const tokens = [
  createToken({
    name: "Newline",
    pattern: /\r\n|\n/,
  }),
  createToken({
    name: "Whitespace",
    pattern: /( |\t)+/,
    group: Lexer.SKIPPED,
  }),
  createToken({
    name: "Identifier",
    pattern: /[a-zA-Z]\w*/,
  }),
];

export const lexer = new Lexer(tokens);

export function lex(input: string) {
  const result = lexer.tokenize(input);

  if (result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  return result.tokens;
}

console.log(lex("\n \n \t"));

export class RedcodeParser extends CstParser {
  constructor() {
    super(tokens);
    // for conciseness
    const $ = this;
  }
}
