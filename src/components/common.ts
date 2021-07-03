import {
  IconDefinition,
  IconProp,
  library,
} from '@fortawesome/fontawesome-svg-core';
import {
  faAddressBook,
  faBug,
  faCashRegister,
  faCog,
  faFileInvoiceDollar,
  faIdCard,
  faUserAlt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

const usedIcons: IconDefinition[] = [
  faUserAlt,
  faAddressBook,
  faCog,
  faFileInvoiceDollar,
  faUsers,
  faIdCard,
  faBug,
  faCashRegister,
];
export const usedIconNames: IconProp[] = usedIcons.map(
  ({ iconName }) => iconName
);
library.add(...usedIcons);

export const contentProportion = {
  sidebar: 7,
};
