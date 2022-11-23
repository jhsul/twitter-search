import Tokenizr from "tokenizr";

const lexer = new Tokenizr();

// Ignore whitespace
lexer.rule(/[ \t\r\n]+/, (ctx, match) => {
  ctx.ignore();
});

lexer.rule(/[a-zA-Z0-9]+(_[a-zA-Z0-9]+)?:[a-zA-Z_0-9]+/, (ctx, match) => {
  ctx.accept("query");
});

lexer.rule(/[a-zA-Z0-9]+/, (ctx, match) => {
  ctx.accept("term");
});

export const tokenize = (input: string) => {
  lexer.input(input);
  lexer.debug(false);
  return lexer.tokens();
};
