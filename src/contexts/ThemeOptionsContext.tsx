// TODO: Move to Chakra UI's provider `theme` prop?

import { createContext } from 'react';

let theming = {
  app: {
    backgroundColor: 'midnightblue',
  },

  navbar: {
    button: {
      chakraScheme: 'blackAlpha',
    },
    buttonContainer: {
      backgroundColor: 'lightsteelblue',
    },
    color: 'white',
  },

  content: {
    backgroundColor: 'white',
  },
};

export default createContext(theming);
