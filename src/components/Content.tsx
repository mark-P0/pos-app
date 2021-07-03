import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import CurrentContentContext, {
  CurrentContentLiterals,
} from '../contexts/CurrentContentContext';
import SizeContext from '../contexts/SizeContext';
import ThemeOptionsContext from '../contexts/ThemeOptionsContext';

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

const Content: React.FC = () => {
  const theming = useContext(ThemeOptionsContext);
  const sizes = useContext(SizeContext);
  const [currentContent] = useContext(CurrentContentContext);

  return (
    <Box h={`calc(100% - ${sizes.navbar.height})`} p="1%">
      <Flex
        h="100%"
        // borderRadius={`${sizes.contentRadius} ${sizes.contentRadius} 0 0`}
        borderRadius={sizes.content.radius}
        // m="1%"
        // bgColor={randomizedCSSrgb()}
        bgColor={theming.content.backgroundColor}
      >
        <Center w="100%">{ContentMap[currentContent]}</Center>
      </Flex>
    </Box>
  );
};

export default Content;
