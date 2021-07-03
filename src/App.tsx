import { Box, ChakraProvider } from '@chakra-ui/react';
import Content from './components/Content';
import Navbar from './components/Navbar';
import customizedTheme from './components/theme';
import { CurrentContentProvider } from './contexts/CurrentContentContext';
import './utilities/standard.css';

const App: React.FC = () => {
  // TODO: Wrap in `SizeContext.Provider`?
  return (
    <ChakraProvider theme={customizedTheme}>
      <CurrentContentProvider>
        <Box
          h="100%"
          // bgColor={randomizedCSSrgb()}
          bgColor="midnightblue"
        >
          <Navbar />
          <Content />
        </Box>
      </CurrentContentProvider>
    </ChakraProvider>
  );
};

export default App;
