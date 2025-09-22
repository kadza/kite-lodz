import { type ReactNode, type FunctionComponent } from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import type { NavLink } from "./navigation";
import "../styles/global.css";

interface LayoutProps {
  navLinks: NavLink[];
  desktopSubNav?: NavLink[];
  mobileSubNav?: NavLink[];
  children: ReactNode;
}

export const Layout: FunctionComponent<LayoutProps> = ({
  navLinks,
  desktopSubNav,
  mobileSubNav,
  children,
}) => (
  <div
    className="flex flex-col bg-white bg-opacity-50 md:bg-transparent"
    style={{ height: "calc(var(--vh, 1vh) * 100)" }}
  >
    <div className="hidden md:block">
      <DesktopNav links={navLinks} subNav={desktopSubNav} />
    </div>

    <div className="container mx-auto flex-1 overflow-hidden p-4 pb-0 mb-2 md:p-8 md:bg-white md:bg-opacity-50 md:rounded-lg">
      <div className="overflow-y-auto h-full">{children}</div>
    </div>

    <div className="md:hidden">
      <MobileNav subNav={mobileSubNav} />
    </div>
  </div>
);
