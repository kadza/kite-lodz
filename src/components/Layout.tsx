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
  <div className="flex flex-col h-screen">
    <Nav
      links={navLinks}
      homeLink={homeLink}
      subNav={subNav}
      isHomePage={isHomePage}
    />

    <div className="container mx-auto flex-1 overflow-hidden p-4 md:p-8 bg-white bg-opacity-50 md:rounded-lg">
      <div className="overflow-y-auto h-full">{children}</div>
    </div>

    <footer className="h-12"></footer>
  </div>
);
