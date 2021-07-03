import { Box, Center, ChakraProvider, Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import customizedTheme from './components/theme';
import { SizeContext } from './contexts/AppContext';
import './utilities/standard.css';

/* App proper */
const App: React.FC = () => {
  const sizes = useContext(SizeContext);

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
        <Box h={`calc(100% - ${sizes.navbar.height})`} p="1%">
          {/* Content */}
          <Flex
            h="100%"
            // borderRadius={`${sizes.contentRadius} ${sizes.contentRadius} 0 0`}
            borderRadius={sizes.content.radius}
            // m="1%"
            // bgColor={randomizedCSSrgb()}
            bgColor="white"
          >
            <Center w="100%">
              <Text>Content</Text>
            </Center>
          </Flex>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;
