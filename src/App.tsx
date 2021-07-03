import { Box, ChakraProvider } from '@chakra-ui/react';
import Content from './components/Content';
import Navbar from './components/Navbar';
import customizedTheme from './components/theme';
import './utilities/standard.css';

/* App proper */
const App: React.FC = () => {
  // TODO: Wrap in `SizeContext.Provider`?
  return (
    <ChakraProvider theme={customizedTheme}>
      <Box
        h="100%"
        // bgColor={randomizedCSSrgb()}
        bgColor="midnightblue"
      >
        {/* Navigation bar */}
        <Navbar />

        {/* Content section */}
        <Content />
      </Box>
    </ChakraProvider>
  );
};

export default App;
