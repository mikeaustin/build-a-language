/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { pegjs } from '@codemirror/legacy-modes/mode/pegjs';
import ReactMarkdown from 'react-markdown';
import * as peggy from 'peggy';
// import { pegjs } from './pegjs';

import { View, Text, Stack, Spacer, Divider, Input } from 'bare';

import * as page1 from './pages/page1';
import * as page2 from './pages/page2';
import * as page3 from './pages/page3';

import './App.css';

const sections = [
  page1,
  page2,
  page3,
  // { title: 'Abstract Syntax Tree', gramar: source[2] },
  // { title: 'Parser Rules', gramar: source[3] },
];

let input: string;

const markdownComponents = {
  h1: ({ children }: { children: any; }) => (
    <Text fontSize="xlarge" fontWeight="semibold" style={{ paddingBottom: 24 }}>{children}</Text>
  ),
  h2: ({ children }: { children: any; }) => (
    <Text fontSize="large" fontWeight="semibold" style={{ paddingBottom: 32 }}>{children}</Text>
  ),
  p: ({ children }: { children: any; }) => (
    <Text fontSize="medium" textColor="gray-7" style={{ paddingBottom: 24 }}>{children}</Text>
  ),
  strong: ({ children }: { children: any; }) => (
    <Text textParent fontWeight="semibold" textColor="gray-9">{children}</Text>
  ),
};

const Section = ({ title, markdown, grammar }) => {
  console.log('here', grammar);
  const [value, setValue] = useState('');

  useEffect(() => {
    const parser = peggy.generate(grammar);

    setValue(
      JSON.stringify(parser.parse(input), undefined, 2)
    );
  }, [grammar]);

  const handleCodeMirrorChange = (gramar) => {
    const parser = peggy.generate(gramar);

    setValue(
      JSON.stringify(parser.parse(input), undefined, 2)
    );
  };

  return (
    <View>
      <View fillColor="white" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <Spacer size="xxlarge" />
        <Text fontSize="xlarge" >{title}</Text>
        <Spacer size="medium" />
        <Divider />
      </View>
      <Stack horizontal spacing="xxlarge">
        <View flex padding="xxlarge none">
          <ReactMarkdown components={markdownComponents}>
            {markdown}
          </ReactMarkdown>
        </View>
        <View flex>
          <View style={{ position: 'sticky', top: 62 }}>
            <Spacer size="xxlarge" />

            <View border fillColor="gray-1">
              <CodeMirror
                value={grammar.trim()}
                extensions={[StreamLanguage.define(pegjs)]}
                onChange={handleCodeMirrorChange}
              />
              <Text padding="large" fillColor="white" style={{ whiteSpace: 'pre' }}>
                {value}
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
        <Section title={section.title} markdown={section.markdown} grammar={section.grammar} />
      ))}
    </Stack>
  );
}

export default App;
