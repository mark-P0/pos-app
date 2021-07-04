import { createContext } from 'react';

let sizes = {
  navbar: {
    logo: {
      sideFactor: 3,
    },
    buttonContainer: {
      height: '90%',
      sidePadding: '4%',
      bottomRadius: '1rem',
    },
    buttonSideMargin: '0.75rem',
    centralWidth: '50%',
    height: '80px',
  },
  content: {
    padding: '1%',
    radius: '2rem',
  },
};

export default createContext(sizes);
