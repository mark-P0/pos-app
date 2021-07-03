import { createContext } from 'react';
import { NavbarButtonIconMap } from '../components/Navbar';

type CurrentContentLiterals = keyof typeof NavbarButtonIconMap;

export default createContext<CurrentContentLiterals>('home');
