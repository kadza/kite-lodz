import { type ReactNode, type FunctionComponent } from "react";
import { Nav } from "./Nav";
import type { NavLink } from "./Nav";
import "../styles/global.css";

interface LayoutProps {
  navLinks: NavLink[];
  subNav?: NavLink[];
  children: ReactNode;
}

export const Layout: FunctionComponent<LayoutProps> = ({
  navLinks,
  subNav,
  children,
}) => (
  <div className="flex flex-col bg-white bg-opacity-50 md:bg-transparent" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
    <div className="hidden md:block">
      <Nav links={navLinks} subNav={subNav} />
    </div>

    <div className="container mx-auto flex-1 overflow-hidden p-4 md:p-8 md:bg-white md:bg-opacity-50 md:rounded-lg">
      <div className="overflow-y-auto h-full">{children}</div>
    </div>

    <div className="md:hidden">
      <Nav links={navLinks} subNav={subNav} />
    </div>
  </div>
);
