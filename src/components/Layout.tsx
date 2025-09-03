import { type ReactNode, type FunctionComponent } from 'react';
import { Nav } from './Nav';
import type { NavLink } from './Nav';
import '../styles/global.css';

interface LayoutProps {
  navLinks: NavLink[];
  homeLink?: string;
  subNav?: NavLink[];
  children: ReactNode;
}

export const Layout: FunctionComponent<LayoutProps> = ({ navLinks, homeLink, subNav, children }) => (
  <div className="h-full m-0 p-0 flex flex-col items-center text-textColor overflow-hidden">
    <div className="container flex flex-col flex-grow pt-[3rem] md:pt-[6rem] h-full">
      <Nav links={navLinks} homeLink={homeLink} subNav={subNav} />

      <div className="flex-grow p-4 md:p-8 bg-white bg-opacity-50 md:rounded-lg overflow-y-auto">
        {children}
      </div>
      <div className="min-h-[2rem] md:min-h-[4rem]"></div>
    </div>
  </div>
);