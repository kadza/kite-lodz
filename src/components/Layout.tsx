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
  <>
    <Nav
      links={navLinks}
      homeLink={homeLink}
      subNav={subNav}
      isHomePage={isHomePage}
    />

    <div
      className={`container mx-auto flex-grow p-4 md:p-8 bg-white bg-opacity-50 md:rounded-lg ${subNav && subNav.length > 1 ? "mt-[6rem]" : "mt-[4rem]"}`}
    >
      {children}
    </div>
  </>
);
