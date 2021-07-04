// TODO: Move to Chakra UI's provider `theme` prop?

import { createContext } from 'react';

let theming = {
  app: {
    backgroundColor: 'maroon',
  },

  navbar: {
    button: {
      chakraScheme: 'whiteAlpha',
    },
    buttonContainer: {
      backgroundColor: 'firebrick',
    },
    color: 'white',
  },

  content: {
    backgroundColor: 'white',
  },
};

export default createContext(theming);
