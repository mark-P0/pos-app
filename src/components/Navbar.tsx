import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { FaCashRegister, FaHome, FaReceipt, FaWarehouse } from 'react-icons/fa';
import { randomizedCSSrgb } from '../utilities/utils';

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
      // variant="ghost"
      // color="white"
    />
  );
};

const Navbar: React.FC = () => {
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
          bgColor="lightsteelblue"
        >
          <Flex flexDirection="row-reverse">
            <NavbarButton name="home" a11y="Go back to the home page" />
            <NavbarButton name="pos" a11y="Render sales services" />
            <NavbarButton name="transactions" a11y="Show previous sales" />
            <NavbarButton name="inventory" a11y="View current inventory" />
          </Flex>
        </Center>

        {/* <ButtonGroup
          //
          bgColor={randomizedCSSrgb()}
        >
          <NavbarButton name="home" a11y="Go back to the home page" />
          <NavbarButton name="pos" a11y="Render sales services" />
          <NavbarButton name="transactions" a11y="Show previous sales" />
          <NavbarButton name="inventory" a11y="View current inventory" />
        </ButtonGroup> */}
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
  );
};

export default Navbar;
