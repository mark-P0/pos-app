import React from 'react';
import './Navbar.css';

type props = {
  additionalClass?: {};
};

const Navbar: React.FC<props> = ({ additionalClass }) => {
  return (
    <div className={[additionalClass].join(' ')}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Navbar;
