const title = 'Syntax and Grammar';

const markdown = `
You might think that you’d need to be a ninja-level coder, with a bunch of tools and libraries by your side to create a programming language. In reality, if you just want to build a very simple, very basic language to learn how it’s done, it’s not that difficult.

This tutorial will guide you through the steps of creating a simple programming language, interactively. Even if you're not a developer, you can follow along and try the examples.

In the next section, **Syntax and Grammar**, we’ll talk about the building blocks of creating a language.
`;

const grammar = `
//
// Parses syntax into an AST, then interprets it directly.
// Accepts expressions such as "(x => 2 * x) (3 + 4)".
//

{
  input = '(x => 2 * x) (3 + 4)';

  class Function {
    constructor(parameter, bodyExpression, environment) {
      this.parameter = parameter;
      this.bodyExpression = bodyExpression;
      this.environment = environment;
    }

    apply(thisArg, [argument]) {
      return evaluate(this.bodyExpression, {
        ...this.environment,
        [this.parameter.name]: argument
      })
    }
  }

  const operators = {
    ['+']: (leftValue, rightValue) => leftValue + rightValue,
    ['-']: (leftValue, rightValue) => leftValue - rightValue,
    ['*']: (leftValue, rightValue) => leftValue * rightValue,
    ['/']: (leftValue, rightValue) => leftValue / rightValue,
  }

  const visitors = {
    Assignment: ({ variable, expression }) => {
      return {
        type: 'Assignment',
        variable: variable,
        expression: expression
      }
    },

    OperatorExpression: (
      { operator, leftExpression, rightExpression },
      environment
    ) => {
      const leftValue = evaluate(leftExpression, environment);
      const rightValue = evaluate(rightExpression, environment);

      return operators[operator](leftValue, rightValue, environment);
    },

    FunctionApplicationExpression({ expression, argument }, environment) {
      const expressionValue = evaluate(expression, environment);
      const argumentValue = evaluate(argument, environment);

      return expressionValue.apply(undefined, [argumentValue, environment]);
    },

    FunctionExpression({ parameter, bodyExpression }, environment) {
      return new Function(parameter, bodyExpression, environment);
    },

    NumericLiteral: ({ value }) => {
      return value;
    },

    Identifier: ({ name }, environment) => {
      return environment[name];
    }
  }

  function evaluate(node, environment) {
    return visitors[node.type](node, environment);
  }
}

Program
  = expression:Statement {
      const environment = {};

      return evaluate(expression, environment);
    }

Statement
  = Assignment
  / Expression

Assignment
  = identifier:Identifier _ "=" _ expression:Expression {
    return {
      type: 'Assignment',
      variable: identifier.name,
      expression: expression
    };
  }

Expression
  = AddExpression

AddExpression
  = leftExpression:MultiplyExpression _
    operator:("+" / "-") _
    rightExpression:MultiplyExpression {
      return {
        type: 'OperatorExpression',
        operator: operator,
        leftExpression: leftExpression,
        rightExpression: rightExpression
      };
    }
  / MultiplyExpression

MultiplyExpression
  = leftExpression:FunctionApplicationExpression _
    operator:("*" / "/") _
    rightExpression:FunctionApplicationExpression {
      return {
        type: 'OperatorExpression',
        operator: operator,
        leftExpression: leftExpression,
        rightExpression: rightExpression
      };
    }
  / FunctionApplicationExpression

FunctionApplicationExpression
  = expression:PrimaryExpression args:(_ PrimaryExpression)* {
      return args.reduce((expression, [, argument]) => ({
        type: 'FunctionApplicationExpression',
        expression,
        argument
      }), expression);
    }

PrimaryExpression
  = "(" _ expression:Expression _ ")" {
    return expression;
  }
  / FunctionExpression
  / NumericLiteral
  / Identifier

FunctionExpression
  = parameter:Identifier _ "=>" _ bodyExpression:Expression {
      return {
        type: 'FunctionExpression',
        parameter,
        bodyExpression
      };
    }

NumericLiteral
  = value:[0-9]+ {
      return {
        type: 'NumericLiteral',
        value: Number(text())
      };
    }

Identifier "identifier"
  = [a-z]+ {
      return {
        type: 'Identifier',
        name: text()
      };
    }

_ "whitespace"
  = " "*
`;

export {
  title,
  markdown,
  grammar,
};
