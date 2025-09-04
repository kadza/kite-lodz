import { type ReactNode, type FunctionComponent } from "react";
import { Nav } from "./Nav";
import type { NavLink } from "./Nav";
import "../styles/global.css";

interface LayoutProps {
  navLinks: NavLink[];
  homeLink?: string;
  subNav?: NavLink[];
  isHomePage?: boolean;
  children: ReactNode;
}

export const Layout: FunctionComponent<LayoutProps> = ({
  navLinks,
  homeLink,
  subNav,
  isHomePage,
  children,
}) => (
  <div className="h-full m-0 p-0 flex flex-col items-center text-textColor">
    <Nav
      links={navLinks}
      homeLink={homeLink}
      subNav={subNav}
      isHomePage={isHomePage}
    />

    <div className={`container flex flex-col flex-grow h-full overflow-y-auto ${subNav && subNav.length > 1 ? 'pt-[6rem]' : 'pt-[3rem]'}`}>
      <div className="flex-grow p-4 md:p-8 bg-white bg-opacity-50 md:rounded-lg">
        {children}
      </div>
      <div className="min-h-[2rem] md:min-h-[4rem]"></div>
    </div>
  </div>
);

