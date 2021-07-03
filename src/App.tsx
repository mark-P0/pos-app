import { Box, Center, ChakraProvider, Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import customizedTheme from './components/theme';
import CurrentContentContext, {
  CurrentContentLiterals,
} from './contexts/CurrentContentContext';
import SizeContext from './contexts/SizeContext';
import './utilities/standard.css';

/* Content components */
const ContentDashboard: React.FC = () => {
  return <Text>Dashboard: Sales numbers</Text>;
};

const ContentPOS: React.FC = () => {
  return <Text>POS: Actual POS display</Text>;
};

const ContentTransactions: React.FC = () => {
  return <Text>Transactions: List of previous transactions</Text>;
};

const ContentInventory: React.FC = () => {
  return <Text>Inventory: Current stock</Text>;
};

let ContentMap: Record<CurrentContentLiterals, JSX.Element> = {
  home: <ContentDashboard />,
  pos: <ContentPOS />,
  transactions: <ContentTransactions />,
  inventory: <ContentInventory />,
};

/* App proper */
const App: React.FC = () => {
  const sizes = useContext(SizeContext);
  const currentContent = useContext(CurrentContentContext);

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
        <CurrentContentContext.Provider value={'home'}>
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
                {/* <Text>Content</Text> */}
                <CurrentContentContext.Consumer>
                  {(data) => ContentMap[data]}
                </CurrentContentContext.Consumer>
              </Center>
            </Flex>
          </Box>
        </CurrentContentContext.Provider>
      </Box>
    </ChakraProvider>
  );
};

export default App;
