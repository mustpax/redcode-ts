import { createToken, CstParser, Lexer } from "chevrotain";

export const Newline = createToken({
  name: "Newline",
  pattern: /\r\n|\n/,
});

export const Whitespace = createToken({
  name: "Whitespace",
  pattern: /( |\t)+/,
  group: Lexer.SKIPPED,
});

export const Comment = createToken({
  name: "Comment",
  pattern: /;[^\r\n]*/,
});

export const Number = createToken({
  name: "Number",
  pattern: /[+-]?\d+/,
});

export const Modifier = createToken({
  name: "Modifier",
  pattern: /A|B|AB|BA|F|X|I/,
});

export const Opcode = createToken({
  name: "Opcode",
  pattern: /DAT|MOV|ADD|SUB|MUL|DIV|MOD|JMP|JMZ|JMN|DJN|CMP|SLT|SPL|ORG|DJZ/,
});

export const AddressingMode = createToken({
  name: "AddressingMode",
  pattern: /#|\$|@|<|>/,
});

export const Comma = createToken({
  name: "Comma",
  pattern: /,/,
});

export const Dot = createToken({
  name: "Dot",
  pattern: /\./,
});

export const tokens = [
  Newline,
  Whitespace,
  Comment,
  Number,
  Modifier,
  Opcode,
  AddressingMode,
  Comma,
  Dot,
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
    const $ = this;

    $.RULE("file", () => {
      $.AT_LEAST_ONE(() => {
        $.SUBRULE($.line);
      });
      $.CONSUME(Newline);
    });

    $.RULE("line", () => {
      $.OR([
        {
          ALT: () => $.SUBRULE($.comment);
        },
        {
          ALT: () => $.SUBRULE($.instruction);
        },
      ]);
      $.CONSUME(Newline);
    });

    $.RULE("instruction", () => {
      $.CONSUME(Opcode);
      $.OPTION(() => {
        $.CONSUME(Dot);
        $.CONSUME(Modifier);
      });
      $.OPTION(() => {
        $.CONSUME(AddressingMode);
      });
      $.CONSUME(Number);
      $.OPTION(() => {
        $.CONSUME(Comma);
        $.OPTION(() => {
          $.CONSUME(AddressingMode);
        });
        $.CONSUME(Number);
      });
      $.OPTION(() => {
        $.SUBRULE($.comment);
      });
    });

    $.RULE("comment", () => {
      $.CONSUME(Comment);
    });

    $.performSelfAnalysis();
  }
}

const parser = new RedcodeParser();

export function parse(input: string) {
  const tokens = lexer.tokenize(input);
  parser.input = tokens.tokens;

  const result = parser.file();

  return result;
}
