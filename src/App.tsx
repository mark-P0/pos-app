import { Box, ChakraProvider } from '@chakra-ui/react';
import './App.css';
import customizedTheme from './components/theme';

const App: React.FC = () => {
  const headerHeight = '80px';

  return (
    <ChakraProvider theme={customizedTheme}>
      <Box h="100%">
        <Box h={headerHeight} bgColor={'plum'}>
          Navigation bar
        </Box>

        <Box h={`calc(100% - ${headerHeight})`} bgColor={'tomato'}>
          Content
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;

/*
import React from 'react';
import sassApp from './App.module.scss';
import Content from './components/Content';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className={sassApp.container}>
      <Navbar additionalClass={sassApp.navbar} />
      <Content additionalClass={sassApp.content} />
    </div>
  );
}
*/
