import React from 'react';
import styles from './App.module.scss';

console.log('Styles', styles);

export default function App() {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>ha</div>
      <div className={styles.content}>he</div>
    </div>
  );

  // return (
  //   <React.Fragment>
  //     <Navbar style="navbar" />
  //     <Content id="content" />
  //   </React.Fragment>
  // );
}
