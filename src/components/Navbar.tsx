import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { CgBox, CgInbox } from 'react-icons/cg';
import { IoMdArrowDropdown, IoMdClose } from 'react-icons/io';
import {
  IoBarcode,
  IoBarcodeOutline,
  IoReceipt,
  IoReceiptOutline,
} from 'react-icons/io5';
import { RiDashboardFill, RiDashboardLine } from 'react-icons/ri';
import CurrentContentContext, {
  CurrentContentLiterals,
} from '../contexts/CurrentContentContext';
import SizeContext from '../contexts/SizeContext';
import ThemeOptionsContext from '../contexts/ThemeOptionsContext';
import { randomizedCSSrgb } from '../utilities/utils';

const NavbarLogoImage: React.FC = () => {
  return (
    <Image
      h="100%"
      src="https://www.designfreelogoonline.com/wp-content/uploads/2015/04/00420-cart-02.png"
      objectFit="contain"
    />
  );
};

const NavbarLogoLabel: React.FC = () => {
  return (
    <Flex
      marginLeft="1rem"
      marginTop="1rem"
      // bgColor={randomizedCSSrgb()}
    >
      <Text fontSize="xl">
        <b>POS</b>App
      </Text>

      <Text fontSize="sm" marginLeft="0.25rem" color="lightcoral">
        v0.1
      </Text>
    </Flex>
  );
};

const NavbarLogo: React.FC = () => {
  const sizes = useContext(SizeContext);

  let upperPad = sizes.content.padding;
  let leftPad = `calc(${upperPad} * ${sizes.navbar.logo.sideFactor})`;

  return (
    <Flex
      w={`calc((100% - ${sizes.navbar.centralWidth}) / 2)`}
      p={`${upperPad} 0 0 ${leftPad}`}
      // bgColor={randomizedCSSrgb()}
    >
      <Flex
        alignItems="center"
        /* bgColor={randomizedCSSrgb()} */
      >
        <NavbarLogoImage />
        <NavbarLogoLabel />
      </Flex>
    </Flex>
  );
};

let NavbarButtonIconMap: Record<CurrentContentLiterals, JSX.Element[]> = {
  /* buttonKind: [active, inactive] */
  home: [<RiDashboardFill />, <RiDashboardLine />],
  pos: [<IoBarcode />, <IoBarcodeOutline />],
  transactions: [<IoReceipt />, <IoReceiptOutline />],
  inventory: [<CgInbox />, <CgBox />],
};

type NavbarButtonPropType = {
  /* https://dev.to/multimo/how-to-build-typescript-string-literal-types-from-objects-values-361l */
  name: keyof typeof NavbarButtonIconMap;
  a11y: string;
};

const NavbarButton: React.FC<NavbarButtonPropType> = (props) => {
  let { name, a11y } = props;

  const theming = useContext(ThemeOptionsContext);
  const [currentContent, setCurrentContent] = useContext(CurrentContentContext);
  let activeState = currentContent === name;

  return (
    <IconButton
      icon={NavbarButtonIconMap[name][activeState ? 0 : 1]}
      aria-label={a11y}
      isRound={true}
      colorScheme={theming.navbar.button.chakraScheme}
      _focus={{}}
      isActive={activeState}
      onClick={() => setCurrentContent(name)}
    />
  );
};

const NavbarButtonSection: React.FC = () => {
  const theming = useContext(ThemeOptionsContext);
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
        bgColor={theming.navbar.buttonContainer.backgroundColor}
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

interface NavbarUserDropdownItemPropType {
  text: string;
  // TODO: Add callback to menu items
  // callback: () => void;
}

const NavbarUserDropdownItem: React.FC<NavbarUserDropdownItemPropType> = ({
  text,
}) => {
  return (
    <MenuItem
      _focus={{
        color: 'white',
        backgroundColor: 'firebrick',
      }}
      _active={{
        color: 'white',
        backgroundColor: 'firebrick',
      }}
    >
      {text}
    </MenuItem>
  );
};

const NavbarUserDropdownActualMenu: React.FC = ({ children }) => {
  return (
    <MenuList
      //
      border={0}
      boxShadow="0 0.33rem 1rem silver"
      color="black"
    >
      {children}
    </MenuList>
  );
};

const NavbarUserDropdown: React.FC = () => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={IconButton}
            icon={isOpen ? <IoMdClose /> : <IoMdArrowDropdown />}
            aria-label="Open menu"
            isRound={true}
            colorScheme="whiteAlpha"
            _focus={{}}
            variant="link"
            color="white"
          />

          <NavbarUserDropdownActualMenu>
            <MenuGroup title="User">
              <NavbarUserDropdownItem text="Account" />
              <NavbarUserDropdownItem text="Statistics" />
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Application">
              <NavbarUserDropdownItem text="Preferences" />
              <NavbarUserDropdownItem text="Help" />
            </MenuGroup>
            <MenuDivider />
            <NavbarUserDropdownItem text="Log Out" />
          </NavbarUserDropdownActualMenu>
        </>
      )}
    </Menu>
  );
};

const NavbarUserLabel: React.FC = () => {
  return (
    <Box
      //
      marginRight="0.66rem"
      textAlign="right"
      // bgColor={randomizedCSSrgb()}
      lineHeight="shorter"
    >
      <Text>
        <b>Sophia Johnson</b>
      </Text>
      <Text fontSize="xs" color="lightcoral">
        <i>Cashier</i>
      </Text>
    </Box>
  );
};

const NavbarUser: React.FC = () => {
  const sizes = useContext(SizeContext);

  let upperPad = sizes.content.padding;
  let rightPad = `calc(${upperPad} * ${sizes.navbar.logo.sideFactor})`;

  return (
    <Flex
      w={`calc((100% - ${sizes.navbar.centralWidth}) / 2)`}
      p={`${upperPad} ${rightPad} 0 0`}
      // bgColor={randomizedCSSrgb()}
    >
      <Flex
        w="100%"
        marginTop="0.75rem"
        alignItems="center"
        flexDirection="row-reverse"
        /* bgColor={randomizedCSSrgb()} */
      >
        <NavbarUserDropdown />
        <NavbarUserLabel />
      </Flex>
    </Flex>
  );
};

const Navbar: React.FC = () => {
  const theming = useContext(ThemeOptionsContext);
  const sizes = useContext(SizeContext);

  return (
    <Flex
      h={sizes.navbar.height}
      color={theming.navbar.color}
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
