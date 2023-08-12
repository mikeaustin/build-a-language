import React, { useState } from 'react';
import { LoremIpsum } from 'lorem-ipsum';

import { View, Text, Stack } from 'bare';

import './App.css';

const lorem = new LoremIpsum({ wordsPerSentence: { min: 2, max: 8 } });

function App() {
  return (
    <Stack divider>
      <View horizontal>
        <View flex padding="xlarge">
          <Text>{lorem.generateParagraphs(20).split('\n').map((par) => <p>{par}</p>)}</Text>
        </View>
        <View flex>
          <View padding="xlarge" style={{ position: 'sticky', top: 0 }}>
            <Text>World</Text>
          </View>
        </View>
      </View>
      <View horizontal>
        <View flex padding="xlarge">
          <Text>{lorem.generateParagraphs(20).split('\n').map((par) => <p>{par}</p>)}</Text>
        </View>
        <View flex>
          <View padding="xlarge" style={{ position: 'sticky', top: 0 }}>
            <Text>World</Text>
          </View>
        </View>
      </View>
      <View horizontal>
        <View flex padding="xlarge">
          <Text>{lorem.generateParagraphs(20).split('\n').map((par) => <p>{par}</p>)}</Text>
        </View>
        <View flex>
          <View padding="xlarge" style={{ position: 'sticky', top: 0 }}>
            <Text>World</Text>
          </View>
        </View>
      </View>
    </Stack>
  );
}

export default App;
