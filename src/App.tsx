import { ChakraProvider } from '@chakra-ui/react';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <div>Hello, world</div>
    </ChakraProvider>
  );
};

export default App;

/*
import React from 'react';
import sassApp from './App.module.scss';
import Content from './components/Content';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className={sassApp.container}>
      <Navbar additionalClass={sassApp.navbar} />
      <Content additionalClass={sassApp.content} />
    </div>
  );
}
*/
