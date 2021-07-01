import { Box, Center, ChakraProvider, Flex, Text } from '@chakra-ui/react';
import customizedTheme from './components/theme';
import './utilities/standard.css';

const App: React.FC = () => {
  // TODO: Move to theme? Chakra provider?
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
        <Flex
          h={sizes.navbarHeight}
          color="white"
          // bgColor={randomizedCSSrgb()}
          flexDirection="row"
        >
          {/* Logo */}
          <Flex
            w={`calc((100% - ${sizes.navbarCentralWidth}) / 2)`}
            // bgColor={randomizedCSSrgb()}
          >
            <Center w="100%">
              <Text>Logo</Text>
            </Center>
          </Flex>

          {/* Button section */}
          <Box
            w={sizes.navbarCentralWidth}
            // bgColor={randomizedCSSrgb()}
          >
            {/* Button container */}
            <Flex
              maxW="fit-content"
              // h={sizes.navbarButtonContainer.height}
              h="100%"
              m="0 auto"
              p={`0 ${sizes.navbarButtonContainer.sidePadding}`}
              borderRadius={`0 0 ${sizes.navbarButtonContainer.radius} ${sizes.navbarButtonContainer.radius}`}
              bgColor="deepskyblue"
            >
              <Center>
                <Text m={`0 ${sizes.navbarButtonSideMargin}`}>hehe</Text>
                <Text m={`0 ${sizes.navbarButtonSideMargin}`}>hehe</Text>
                <Text m={`0 ${sizes.navbarButtonSideMargin}`}>hehe</Text>
                {/* <IconButton aria-label="Go back to the home page" icon={} /> */}
              </Center>
            </Flex>
          </Box>

          {/* User */}
          <Flex
            w={`calc((100% - ${sizes.navbarCentralWidth}) / 2)`}
            // bgColor={randomizedCSSrgb()}
          >
            <Center w="100%">
              <Text>User details</Text>
            </Center>
          </Flex>
        </Flex>

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
