import { createContext } from 'react';

let sizes = {
  navbar: {
    height: '80px',
    centralWidth: '50%',
    buttonContainer: {
      height: '90%',
      sidePadding: '4%',
      bottomRadius: '1rem',
    },
    buttonSideMargin: '0.75rem',
  },
  content: { radius: '2rem' },
};

export default createContext(sizes);
