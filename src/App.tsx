import React, { useState } from 'react';
import { LoremIpsum } from 'lorem-ipsum';
import CodeMirror from '@uiw/react-codemirror';
// import { EditorView } from 'codemirror;';
import { createTheme } from '@uiw/codemirror-themes';
import { pegjs } from './pegjs';

import { View, Text, Stack, Spacer, Divider } from 'bare';

import './App.css';

const theme = createTheme({
  theme: 'light',
  settings: {
    lineHighlight: 'transparent',
    gutterBackground: '#f1f3f5',
    gutterBorder: '#dee2e6',
  },
  styles: [],
});

const lorem = new LoremIpsum({ wordsPerSentence: { min: 2, max: 8 } });

const source = [
  `
{
  NumericLiteral
    = value:[0-9]+ {
        return Number(text());
      }
}
  `,
  `
{
  NumericLiteral
    = value:[0-9]+ {
        return {
          type: 'NumericLiteral',
          value: Number(text())
        };
      }
  `,
  `
{
  Expression
    = NumericLiteral
    
  NumericLiteral
    = value:[0-9]+ {
        return {
          type: 'NumericLiteral',
          value: Number(text())
        };
      }
  `,
  `
{
  Statement
    = expression:Expression {
      return expression;
    }

  Expression
    = NumericLiteral

  NumericLiteral
    = value:[0-9]+ {
        return {
          type: 'NumericLiteral',
          value: Number(text())
        };
      }
  `,
];

const sections = [
  { title: 'Introduction', gramar: source[0] },
  { title: 'Syntax and Grammar', gramar: source[1] },
  { title: 'Abstract Syntax Tree', gramar: source[2] },
  { title: 'Parser Rules', gramar: source[3] },
];

const Section = ({ title, gramar }) => {
  return (
    <View>
      <View fillColor="white" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <Spacer size="xlarge" />
        <Text fontSize="large" >{title}</Text>
        <Spacer size="medium" />
        <Divider />
      </View>
      <Stack horizontal spacing="xlarge">
        <View flex>
          <Text fontSize="medium" padding="xlarge none" textColor="gray-7">
            {lorem.generateParagraphs(5).split('\n').map((p) => <p>{p}</p>)}
          </Text>
        </View>
        <View flex>
          <View style={{ position: 'sticky', top: 52 }}>
            <Spacer size="large" />
            <View border fillColor="gray-1">
              <CodeMirror
                value={gramar.trim()}
                theme={theme}
                style={{ padding: 16 }}
              />
              <Text padding="large" fillColor="white">
                120
              </Text>
            </View>
          </View>
        </View>
      </Stack>
    </View>
  );
};
function App() {
  return (
    <Stack>
      {sections.map(section => (
        <Section title={section.title} gramar={section.gramar} />
      ))}
    </Stack>
  );
}

export default App;
