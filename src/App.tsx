import {
  Box,
  Center,
  ChakraProvider,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { FaCashRegister, FaHome, FaReceipt, FaWarehouse } from 'react-icons/fa';
import customizedTheme from './components/theme';
import './utilities/standard.css';

/* Central buttons */
let NavbarButtonIconMap = {
  home: <FaHome />,
  pos: <FaCashRegister />,
  transactions: <FaReceipt />,
  inventory: <FaWarehouse />,
};

type NavbarButtonPropType = {
  // https://dev.to/multimo/how-to-build-typescript-string-literal-types-from-objects-values-361l
  name: keyof typeof NavbarButtonIconMap;
  a11y: string;
};

const NavbarButton: React.FC<NavbarButtonPropType> = (props) => {
  let { name, a11y } = props;

  return (
    <IconButton
      icon={NavbarButtonIconMap[name]}
      aria-label={a11y}
      isRound={true}
      colorScheme="blackAlpha"
      m="0 0.75rem"
    />
  );
};

/* App proper */
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
            <Center
              maxW="fit-content"
              // h={sizes.navbarButtonContainer.height}
              h="100%"
              m="0 auto"
              p={`0 ${sizes.navbarButtonContainer.sidePadding}`}
              borderRadius={`0 0 ${sizes.navbarButtonContainer.radius} ${sizes.navbarButtonContainer.radius}`}
              bgColor="deepskyblue"
            >
              <Flex flexDirection="row-reverse">
                <NavbarButton name="home" a11y="Go back to the home page" />
                <NavbarButton name="pos" a11y="Render sales services" />
                <NavbarButton name="transactions" a11y="Show previous sales" />
                <NavbarButton name="inventory" a11y="View current inventory" />
              </Flex>
            </Center>
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
