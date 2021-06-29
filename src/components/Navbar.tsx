import React from 'react';
import styles from './Navbar.module.scss';

const NavbarLogo: React.FC = () => {
  return <div className={styles.navbarLogo}>Logo</div>;
};

const NavbarButtons: React.FC = () => {
  return (
    <div className={styles.navbarButtons}>
      <div className={styles.buttonContainer}></div>
    </div>
  );
};

const NavbarUser: React.FC = () => {
  return <div className={styles.navbarUser}>User</div>;
};

type NavbarProps = {
  additionalClass?: string;
};

const Navbar: React.FC<NavbarProps> = ({ additionalClass }) => {
  return (
    <div className={[additionalClass, styles.navbar].join(' ')}>
      <NavbarLogo />
      <NavbarButtons />
      <NavbarUser />
    </div>
  );
};

export default Navbar;
