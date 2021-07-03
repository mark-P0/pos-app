import { Box, Center, ChakraProvider, Flex, Text } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import customizedTheme from './components/theme';
import './utilities/standard.css';

/* App proper */
const App: React.FC = () => {
  // TODO: Move to theme? Chakra provider?
  // TODO: Redundant! Remove this
  const sizes = {
    navbarHeight: '80px',
    navbarCentralWidth: '50%',
    navbarButtonContainer: {
      height: '90%',
      sidePadding: '4%',
      radius: '1rem',
    },
    navbarButtonSideMargin: '0.75rem',
    contentRadius: '2rem',
  };

  return (
    <ChakraProvider theme={customizedTheme}>
      {/* App container */}
      <Box
        h="100%"
        // bgColor={randomizedCSSrgb()}
        bgColor="midnightblue"
      >
        {/* Navigation bar */}
        <Navbar />

        {/* Content section */}
        <Box h={`calc(100% - ${sizes.navbarHeight})`} p="1%">
          {/* Content */}
          <Flex
            h="100%"
            // borderRadius={`${sizes.contentRadius} ${sizes.contentRadius} 0 0`}
            borderRadius={sizes.contentRadius}
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
