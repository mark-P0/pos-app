import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { FaCashRegister, FaHome, FaReceipt, FaWarehouse } from 'react-icons/fa';
import CurrentContentContext, {
  CurrentContentLiterals,
} from '../contexts/CurrentContentContext';
import SizeContext from '../contexts/SizeContext';
import { randomizedCSSrgb } from '../utilities/utils';

const NavbarLogo: React.FC = () => {
  const sizes = useContext(SizeContext);

  return (
    <Flex
      w={`calc((100% - ${sizes.navbar.centralWidth}) / 2)`}
      // bgColor={randomizedCSSrgb()}
    >
      <Center w="100%">
        <Text>Logo</Text>
      </Center>
    </Flex>
  );
};

let NavbarButtonIconMap: Record<CurrentContentLiterals, JSX.Element> = {
  home: <FaHome />,
  pos: <FaCashRegister />,
  transactions: <FaReceipt />,
  inventory: <FaWarehouse />,
};

type NavbarButtonPropType = {
  /* https://dev.to/multimo/how-to-build-typescript-string-literal-types-from-objects-values-361l */
  name: keyof typeof NavbarButtonIconMap;
  a11y: string;
};

const NavbarButton: React.FC<NavbarButtonPropType> = (props) => {
  let { name, a11y } = props;

  const [currentContent, setCurrentContent] = useContext(CurrentContentContext);

  return (
    <IconButton
      icon={NavbarButtonIconMap[name]}
      aria-label={a11y}
      isRound={true}
      colorScheme="blackAlpha"
      // m="0 0.75rem"
      // variant="ghost"
      // color="white"
      _focus={{}}
      isActive={currentContent === name}
      onClick={() => setCurrentContent(name)}
      onFocus={() => console.log(`${name} captured focus!`)}
      onBlur={() => console.log(`${name} lost focus!`)}
    />
  );
};

const NavbarButtonSection: React.FC = () => {
  const sizes = useContext(SizeContext);
  let { sidePadding, bottomRadius } = sizes.navbar.buttonContainer;

  return (
    <Box
      w={sizes.navbar.centralWidth}
      // bgColor={randomizedCSSrgb()}
    >
      {/* Button container */}
      <Center
        w="fit-content"
        h="100%"
        m="0 auto"
        p={`0 ${sidePadding}`}
        borderRadius={`0 0 ${bottomRadius} ${bottomRadius}`}
        bgColor="lightsteelblue"
      >
        <ButtonGroup
          spacing="1.5rem"
          // bgColor={randomizedCSSrgb()}
        >
          <NavbarButton name="home" a11y="Go back to the home page" />
          <NavbarButton name="pos" a11y="Render sales services" />
          <NavbarButton name="transactions" a11y="Show previous sales" />
          <NavbarButton name="inventory" a11y="View current inventory" />
        </ButtonGroup>
      </Center>
    </Box>
  );
};

const NavbarUser: React.FC = () => {
  const sizes = useContext(SizeContext);

  return (
    <Flex
      w={`calc((100% - ${sizes.navbar.centralWidth}) / 2)`}
      // bgColor={randomizedCSSrgb()}
    >
      <Center w="100%">
        <Text>User details</Text>
      </Center>
    </Flex>
  );
};

const Navbar: React.FC = () => {
  const sizes = useContext(SizeContext);

  return (
    <Flex
      h={sizes.navbar.height}
      color="white"
      // bgColor={randomizedCSSrgb()}
      flexDirection="row"
    >
      <NavbarLogo />
      <NavbarButtonSection />
      <NavbarUser />
    </Flex>
  );
};

export default Navbar;
export { NavbarButtonIconMap };
