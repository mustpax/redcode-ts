import { createToken, Lexer } from "chevrotain";

export const selectLexer = new Lexer([
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
]);

export function lex(input: string) {
  const result = selectLexer.tokenize(input);

  if (result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  return result.tokens;
}

console.log(
  lex(`
  `)
);
